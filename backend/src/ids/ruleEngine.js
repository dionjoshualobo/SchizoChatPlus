import { Buffer } from 'buffer';

export const rules = [
  {
    id: 'R001',
    name: 'Oversized Packet',
    check: (packet) => packet.size > 1048576,
    riskScore: 40,
    action: 'flag',
    description: 'Packet exceeds 1MB size limit'
  },
  {
    id: 'R002',
    name: 'Malformed JSON',
    check: (packet) => {
      try {
        JSON.parse(packet.payload);
        return false;
      } catch (e) {
        return true;
      }
    },
    riskScore: 60,
    action: 'block',
    description: 'Invalid JSON structure in payload'
  },
  {
    id: 'R003',
    name: 'SQL Injection Attempt',
    check: (packet) => /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|EXEC)\b)/i.test(packet.payload),
    riskScore: 80,
    action: 'block',
    description: 'Detected SQL injection pattern in payload'
  },
  {
    id: 'R004',
    name: 'Rate Limiting',
    check: (packet, metadata) => {
      if (!metadata || !metadata.messageRate) return false;
      return metadata.messageRate > 10; // messages per second
    },
    riskScore: 50,
    action: 'flag',
    description: 'User sending messages too rapidly (>10/sec)'
  },
  {
    id: 'R005',
    name: 'XSS Attempt',
    check: (packet) => /<script.*?>.*?<\/script>/i.test(packet.payload),
    riskScore: 70,
    action: 'block',
    description: 'Detected script tag in payload (XSS attempt)'
  },
  {
    id: 'R006',
    name: 'Excessive Images',
    check: (packet, metadata) => metadata?.imageCount > 5,
    riskScore: 30,
    action: 'flag',
    description: 'User sent more than 5 images in 1 minute'
  },
  {
    id: 'R007',
    name: 'Null Bytes Detected',
    check: (packet) => packet.payload && packet.payload.includes('\0'),
    riskScore: 65,
    action: 'block',
    description: 'Null byte character found in payload'
  },
  {
    id: 'R008',
    name: 'Unusual Characters',
    check: (packet) => {
      const text = packet.payload || '';
      // Detect non-UTF8 or strange characters
      return /[^\x00-\x7F]+/.test(text);
    },
    riskScore: 45,
    action: 'flag',
    description: 'Payload contains non-UTF8 or unusual characters'
  },
  {
    id: 'R009',
    name: 'Null Byte Detected',
    check: (packet) => packet.payload.includes('\0'),
    riskScore: 65,
    action: 'block',
    description: 'Payload contains null byte(s)'
  }
];


// Core Rule Engine Functions

/**
 * Evaluate all rules against the incoming packet
 * @param {Object} packet - The network packet
 * @param {Object} metadata - Additional data (e.g., user stats)
 * @returns {Object} result { totalRisk, triggeredRules, actions }
 */
export function evaluateRules(packet, metadata = {}) {
  let totalRisk = 0;
  const triggeredRules = [];
  const actions = new Set();

  for (const rule of rules) {
    try {
      if (checkRule(rule, packet, metadata)) {
        totalRisk += rule.riskScore;
        triggeredRules.push(rule.id);
        actions.add(rule.action);
      }
    } catch (err) {
      console.error(`Error evaluating rule ${rule.id}:`, err.message);
    }
  }

  return {
    totalRisk,
    triggeredRules,
    suggestedAction: determinePriorityAction(actions)
  };
}

/**
 * Checks a single rule condition against the packet
 */
export function checkRule(rule, packet, metadata) {
  return rule.check(packet, metadata);
}

/**
 * Get a specific rule by ID
 */
export function getRuleById(ruleId) {
  return rules.find((r) => r.id === ruleId) || null;
}

/**
 * Add a custom rule dynamically at runtime
 */
export function addRule(rule) {
  if (!rule.id || !rule.check) {
    throw new Error('Invalid rule: must contain id and check function.');
  }
  rules.push(rule);
}

/**
 * Determines which action to prioritize if multiple rules are triggered
 * (block > flag > allow)
 */
export function determinePriorityAction(actions) {
  if (actions.has('block')) return 'block';
  if (actions.has('flag')) return 'flag';
  return 'allow';
}

export default {
  evaluateRules,
  checkRule,
  getRuleById,
  addRule,
  determinePriorityAction
};
