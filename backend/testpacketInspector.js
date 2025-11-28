// backend/testPacketInspector.js
import { inspectPacket } from './src/ids/packetInspector.js';

const testPacket = {
  id: 'unique-id',
  source: 'user1',
  destination: 'user2',
  layer: 'entry',
  timestamp: new Date().toISOString(),
  payload: '{"message":"Hello <script>alert(1)</script>"}',
  size: Buffer.byteLength('{"message":"Hello <script>alert(1)</script>"}', 'utf-8')
};

const result = inspectPacket(testPacket, 'entry-node-1');
console.log('🔍 Packet Inspection Result:\n', result);
