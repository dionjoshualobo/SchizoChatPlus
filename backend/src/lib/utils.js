import jwt from "jsonwebtoken";

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

// Simulate routing a Tor packet through the network
export async function routeTorPacket(packet, nodes) {
  if (!validateTorPacket(packet)) {
    throw new Error("Invalid Tor packet structure.");
  }

  console.log("Routing packet through Tor network...");

  for (const node of nodes) {
    console.log(`Routing through node: ${node.id} (${node.type})`);

    // Simulate encryption/decryption at each node
    packet.payload = encryptDecryptLayer(packet.payload, node.key);
    packet.layer = node.type;
  }

  console.log("Packet successfully routed through Tor network.");
  return packet;
}

// Simulate encryption/decryption for a layer
function encryptDecryptLayer(payload, key) {
  // Placeholder for actual encryption/decryption logic
  return `${payload} (processed with key: ${key})`;
}
