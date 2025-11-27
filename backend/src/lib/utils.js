import jwt from "jsonwebtoken";

// Utility function to create a Tor packet
function createTorPacket(message, source, destination, layer) {
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
function validateTorPacket(packet) {
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

module.exports = {
  createTorPacket,
  validateTorPacket,
};
