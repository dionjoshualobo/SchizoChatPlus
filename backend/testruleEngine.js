import RuleEngine from './src/ids/ruleEngine.js';

const packet = {
  payload: '{"query":"SELECT * FROM users WHERE id=1"}',
  size: 1200000
};

const metadata = {
  messageRate: 12,
  imageCount: 2
};

console.log(RuleEngine.evaluateRules(packet, metadata));
