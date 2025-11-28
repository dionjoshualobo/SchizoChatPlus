import AnomalyDetector from './src/ids/anomalyDetector.js';

// Step 1: Train with normal data
const normalTrafficData = [
  { 
    id: 'id1',
    source: 'user1',
    destination: 'user2',
    layer: 'entry',
    timestamp: new Date().toISOString(),
    payload: '{"msg":"hi"}',
    size: Buffer.byteLength('{"msg":"hi"}', 'utf-8'),
    riskScore: 20, 
    flags: [] 
  },
  { 
    id: 'id2',
    source: 'user1',
    destination: 'user3',
    layer: 'middle',
    timestamp: new Date().toISOString(),
    payload: '{"msg":"hello"}',
    size: Buffer.byteLength('{"msg":"hello"}', 'utf-8'),
    riskScore: 25, 
    flags: [] 
  },
  { 
    id: 'id3',
    source: 'user2',
    destination: 'user3',
    layer: 'exit',
    timestamp: new Date().toISOString(),
    payload: '{"msg":"how are you"}',
    size: Buffer.byteLength('{"msg":"how are you"}', 'utf-8'),
    riskScore: 30, 
    flags: [] 
  }
];
AnomalyDetector.trainModel(normalTrafficData);

// Step 2: Test new packet
const suspiciousPacket = {
  id: 'unique-id',
  source: 'user1',
  destination: 'user2',
  layer: 'entry',
  timestamp: new Date().toISOString(),
  payload: '{"msg":"<script>alert(1)</script>"}',
  size: Buffer.byteLength('{"msg":"<script>alert(1)</script>"}', 'utf-8'),
  riskScore: 90,
  flags: ['XSS_ATTEMPT']
};

console.log('Suspicious Packet:', AnomalyDetector.detectAnomaly(suspiciousPacket));
