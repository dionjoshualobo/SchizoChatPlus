export function determineAction(riskScore, flags = []) {
  let action = 'ALLOW';

  if (riskScore >= 80) {
    action = 'BLOCK';
  } else if (riskScore >= 50) {
    action = 'FLAG';
  } else {
    action = 'ALLOW';
  }

  return { action, flags, riskScore };
}

export function executeAction(action, packet) {
  switch (action) {
    case 'BLOCK':
      return blockPacket(packet, 'High risk score detected');
    case 'FLAG':
      return flagPacket(packet, 'Suspicious packet — needs review');
    case 'ALLOW':
    default:
      return allowPacket(packet);
  }
}


export function blockPacket(packet, reason) {
  const event = {
    type: 'packet_blocked',
    severity: 'high',
    packetId: packet.packetId,
    reason,
    timestamp: new Date(),
  };

  notifyAdmin(event);

  return {
    status: 'BLOCKED',
    reason,
    packetId: packet.packetId,
  };
}


export function flagPacket(packet, reason) {
  const event = {
    type: 'packet_flagged',
    severity: 'medium',
    packetId: packet.packetId,
    reason,
    timestamp: new Date(),
  };

  return {
    status: 'FLAGGED',
    reason,
    packetId: packet.packetId,
  };
}


export function allowPacket(packet) {
  return {
    status: 'ALLOWED',
    packetId: packet.packetId,
  };
}


export function notifyAdmin(event) {
  console.log('Admin notified:', event);
}

export default {
  determineAction,
  executeAction,
  blockPacket,
  flagPacket,
  allowPacket,
  notifyAdmin,
};
