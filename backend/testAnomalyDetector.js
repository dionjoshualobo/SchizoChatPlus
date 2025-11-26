import AnomalyDetector from './src/ids/anomalyDetector.js';

// Step 1: Train with normal data
const normalTrafficData = [
  { size: 400, payload: '{"msg":"hi"}', riskScore: 20, flags: [] },
  { size: 500, payload: '{"msg":"hello"}', riskScore: 25, flags: [] },
  { size: 600, payload: '{"msg":"how are you"}', riskScore: 30, flags: [] },
];
AnomalyDetector.trainModel(normalTrafficData);

// Step 2: Test new packet
const suspiciousPacket = {
  size: 1800,
  payload: '{"msg":"<script>alert(1)</script>"}',
  riskScore: 90,
  flags: ['XSS_ATTEMPT']
};

console.log('Suspicious Packet:', AnomalyDetector.detectAnomaly(suspiciousPacket));
