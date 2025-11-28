import RuleEngine from './src/ids/ruleEngine.js';

const packet = {
  id: 'unique-id',
  source: 'user1',
  destination: 'user2',
  layer: 'entry',
  timestamp: new Date().toISOString(),
  payload: '{"query":"SELECT * FROM users WHERE id=1"}',
  size: Buffer.byteLength('{"query":"SELECT * FROM users WHERE id=1"}', 'utf-8')
};

const metadata = {
  messageRate: 12,
  imageCount: 2
};

console.log(RuleEngine.evaluateRules(packet, metadata));
