// backend/src/ids/packetInspector.js

import crypto from 'crypto';

/**
 * Packet Inspector Module
 * ----------------------------------
 * Responsible for analyzing packet structure, extracting metadata,
 * and calculating a risk score based on size, structure, and patterns.
 */

export function inspectPacket(packet, nodeId) {
  const metadata = extractMetadata(packet, nodeId);
  const flags = [];
  let riskScore = 0;

  // Validate structure
  if (!validateStructure(packet)) {
    flags.push('INVALID_STRUCTURE');
    riskScore += 50;
  }

  // Calculate packet size
  const packetSize = calculatePacketSize(packet);
  if (packetSize > 1048576) { // > 1MB
    flags.push('OVERSIZED_PACKET');
    riskScore += 40;
  }

  // Check if payload is valid JSON
  try {
    JSON.parse(packet.payload);
  } catch (err) {
    flags.push('MALFORMED_JSON');
    riskScore += 60;
  }

  // Detect suspicious patterns
  if (containsSQLInjection(packet.payload)) {
    flags.push('SQL_INJECTION_ATTEMPT');
    riskScore += 80;
  }

  if (containsXSSAttempt(packet.payload)) {
    flags.push('XSS_ATTEMPT');
    riskScore += 70;
  }

  // Null byte detection
  if (packet.payload && packet.payload.includes('\0')) {
    flags.push('NULL_BYTE_DETECTED');
    riskScore += 65;
  }

  // Generate inspection result
  const result = {
    nodeId,
    packetId: metadata.packetId,
    metadata,
    riskScore,
    flags,
    timestamp: new Date()
  };

  return result;
}

/**
 * Extract metadata from the packet
 */
export function extractMetadata(packet, nodeId) {
  return {
    packetId: crypto.randomUUID(),
    nodeId,
    senderId: packet.senderId || 'unknown',
    receiverId: packet.receiverId || 'unknown',
    size: calculatePacketSize(packet),
    timestamp: new Date()
  };
}

/**
 * Validate the packet’s structure
 * Ensures required fields exist and types are correct
 */
export function validateStructure(packet) {
  const requiredFields = ['payload', 'senderId', 'receiverId'];
  for (const field of requiredFields) {
    if (!packet.hasOwnProperty(field)) {
      return false;
    }
  }
  return true;
}

/**
 * Calculate the packet size in bytes
 */
export function calculatePacketSize(packet) {
  try {
    return Buffer.byteLength(JSON.stringify(packet), 'utf8');
  } catch (e) {
    return 0;
  }
}

/**
 * Detect potential SQL injection attempts
 */
export function containsSQLInjection(text = '') {
  const sqlPatterns = [
    /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|EXEC)\b)/i,
    /('|--|;|\/\*|\*\/|xp_)/i
  ];
  return sqlPatterns.some((regex) => regex.test(text));
}

/**
 * Detect XSS (Cross-Site Scripting) attempts
 */
export function containsXSSAttempt(text = '') {
  const xssPatterns = [
    /<script.*?>.*?<\/script>/i,
    /javascript:/i,
    /onerror\s*=/i,
    /onload\s*=/i
  ];
  return xssPatterns.some((regex) => regex.test(text));
}
