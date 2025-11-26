// backend/testPacketInspector.js
import { inspectPacket } from './src/ids/packetInspector.js';

const testPacket = {
  senderId: 'user1',
  receiverId: 'user2',
  payload: '{"message":"Hello <script>alert(1)</script>"}'
};

const result = inspectPacket(testPacket, 'entry-node-1');
console.log('🔍 Packet Inspection Result:\n', result);
