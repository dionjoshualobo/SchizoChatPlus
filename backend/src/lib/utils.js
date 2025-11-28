import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import fetch from "node-fetch";

// Utility function to create a Tor packet
export function createTorPacket(message, source, destination, layer) {
  return {
    id: generateUniqueId(), // Generate a unique ID for the packet
    source,
    destination,
    layer,
    timestamp: new Date().toISOString(),
    payload: message, // Embed the existing message JSON as the payload
  };
}

// Utility function to validate a Tor packet
export function validateTorPacket(packet) {
  const requiredFields = [
    "id",
    "source",
    "destination",
    "layer",
    "timestamp",
    "payload",
  ];
  return requiredFields.every((field) => field in packet);
}

// Helper function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Export the generateToken function
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

// Simulate encryption/decryption for a layer
function encryptDecryptLayer(payload, key) {
  // Placeholder for actual encryption/decryption logic
  return `${payload} (processed with key: ${key})`;
}

// Encryption function for a layer
export function encryptLayer(data, key) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, key.slice(0, 16));
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function for a layer
export function decryptLayer(encryptedData, key) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, key.slice(0, 16));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

// Generate a random encryption key
export function generateEncryptionKey() {
  return crypto.randomBytes(32);
}

// Function to route a Tor packet through the Python Tor network
export async function routeTorPacketThroughPython(packet) {
  try {
    // Send the packet to the entry node
    const entryNodeResponse = await axios.post("http://localhost:9001/processPacket", packet);
    const entryNodePacket = entryNodeResponse.data;

    // Send the packet to the middle node
    const middleNodeResponse = await axios.post("http://localhost:9003/processPacket", entryNodePacket);
    const middleNodePacket = middleNodeResponse.data;

    // Send the packet to the exit node
    const exitNodeResponse = await axios.post("http://localhost:9006/processPacket", middleNodePacket);
    const exitNodePacket = exitNodeResponse.data;

    return exitNodePacket; // Final decrypted packet
  } catch (error) {
    console.error("Error routing packet through Python Tor network:", error.message);
    throw new Error("Failed to route packet through Tor network.");
  }
}
