import {
  determineAction,
  executeAction
} from './src/ids/actionHandler.js';

// Sample packet
const testPacket = {
  packetId: "12345",
  senderId: "userA",
  receiverId: "userB",
  payload: "Hello World",
  size: 500,
};

// Try different risk scores:

function runTest(riskScore) {
  console.log("\n==============================");
  console.log("Testing Risk Score:", riskScore);
  console.log("==============================");

  const { action } = determineAction(riskScore, []);
  const result = executeAction(action, testPacket);

  console.log("Action Determined:", action);
  console.log("Execution Result:", result);
}

runTest(20);   // Should be ALLOW
runTest(55);   // Should be FLAG
runTest(95);   // Should be BLOCK
