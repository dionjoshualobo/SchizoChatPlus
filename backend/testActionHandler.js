import { connectDB } from './src/lib/db.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Ensure the database connection is established before running tests
await connectDB();

import {
  determineAction,
  executeAction
} from './src/ids/actionHandler.js';

// Sample packet
const testPacket = {
  id: 'unique-id',
  source: 'userA',
  destination: 'userB',
  layer: 'entry',
  timestamp: new Date().toISOString(),
  payload: 'Hello World',
  size: Buffer.byteLength('Hello World', 'utf-8')
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
