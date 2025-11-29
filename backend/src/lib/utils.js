import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const TOR_CONFIG_PATH = path.resolve(process.cwd(), "tor_sim/tor_nodes_config.json");
const DEFAULT_TOR_NODES = [
  { id: 1, type: "entry", port: 9001 },
  { id: 3, type: "middle", port: 9003 },
  { id: 6, type: "exit", port: 9006 },
];

let cachedTorNodes = null;

function loadTorNodesConfig() {
  if (cachedTorNodes) {
    return cachedTorNodes;
  }

  try {
    const raw = fs.readFileSync(TOR_CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    cachedTorNodes = parsed.nodes || [];
  } catch (error) {
    console.warn("[Tor Router] Unable to read tor_nodes_config.json, falling back to defaults:", error.message);
    cachedTorNodes = DEFAULT_TOR_NODES;
  }

  if (!cachedTorNodes.length) {
    cachedTorNodes = DEFAULT_TOR_NODES;
  }

  return cachedTorNodes;
}

function getRandomNodeByType(type, excludedNodeIds = new Set()) {
  const nodes = loadTorNodesConfig().filter(
    (node) => node.type === type && !excludedNodeIds.has(node.id)
  );
  if (!nodes.length) {
    throw new Error(`No TOR nodes configured for type: ${type}`);
  }
  const randomIndex = Math.floor(Math.random() * nodes.length);
  return nodes[randomIndex];
}

async function forwardThroughLayer(packet, type) {
  const nodesForType = loadTorNodesConfig().filter((node) => node.type === type);
  if (!nodesForType.length) {
    throw new Error(`No TOR nodes available for type: ${type}`);
  }

  const attempted = new Set();
  let lastError = null;

  while (attempted.size < nodesForType.length) {
    let node;
    try {
      node = getRandomNodeByType(type, attempted);
    } catch (error) {
      throw lastError || error;
    }

    try {
      const response = await axios.post(`http://localhost:${node.port}/processPacket`, packet);
      return { packet: response.data, node };
    } catch (error) {
      lastError = new Error(`[Tor Router] ${type} node ${node.id} on port ${node.port} failed: ${error.message}`);
      console.warn(lastError.message);
      attempted.add(node.id);
    }
  }

  throw lastError || new Error(`All ${type} nodes failed to process packet`);
}

// Updated packet structure to include IDS metadata fields
export function createTorPacket(message, source, destination, layer) {
  return {
    id: generateUniqueId(),
    source,
    destination,
    layer,
    timestamp: new Date().toISOString(),
    payload: message,
    riskScore: 0, // Default risk score
    flags: [], // Default empty flags array
    action: "allow", // Default action
  };
}

// Updated validation to include new fields
export function validateTorPacket(packet) {
  const requiredFields = [
    "id",
    "source",
    "destination",
    "layer",
    "timestamp",
    "payload",
    "riskScore",
    "flags",
    "action",
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
    const entryResult = await forwardThroughLayer(packet, "entry");
    const middleResult = await forwardThroughLayer(entryResult.packet, "middle");
    const exitResult = await forwardThroughLayer(middleResult.packet, "exit");

    console.log(
      `[Tor Router] Selected path: Entry ${entryResult.node.id} (:${entryResult.node.port}) -> Middle ${middleResult.node.id} (:${middleResult.node.port}) -> Exit ${exitResult.node.id} (:${exitResult.node.port})`
    );

    return exitResult.packet; // Final decrypted packet
  } catch (error) {
    console.error("Error routing packet through Python Tor network:", error.message);
    throw new Error("Failed to route packet through Tor network.");
  }
}
