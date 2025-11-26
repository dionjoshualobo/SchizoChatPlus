# SchizoChatPlus - Team Work Distribution

**Project:** Tor-Simulated Network with Intrusion Detection System  
**Team Size:** 4 Members  
**Timeline:** 4 Weeks  
**Repository:** https://github.com/dionjoshualobo/SchizoChatPlus/

---

## 🎯 Project Overview

We're transforming SchizoChatPlus from a basic chat app into an educational Tor-simulated network with AI-based intrusion detection. Messages will route through multiple relay nodes with encryption layers, and an IDS will monitor and filter suspicious packets.

**Educational Goals:**
- Demonstrate onion routing (like Tor)
- Show network security concepts (IDS, packet filtering)
- Visualize message flow and relay networks
- Log and analyze network traffic

---

## 👥 Team Member 1: Tor Routing System Engineer

**Role:** Backend - Core Routing Infrastructure  
**Complexity:** ⭐⭐⭐⭐ (High - requires understanding of encryption and routing)  
**Estimated Time:** 25-30 hours

### Responsibilities
Implement the simulated Tor network with multi-hop relay routing and encryption layers.

### Files to Create

```
backend/src/tor/relayNode.js
backend/src/tor/circuitBuilder.js
backend/src/tor/encryptionLayer.js
backend/src/tor/routingEngine.js
backend/src/tor/latencySimulator.js
backend/src/tor/torConfig.js
```

### Files to Modify

```
backend/src/controllers/message.controller.js
backend/src/lib/socket.js
```

### Detailed Task Breakdown

#### 1. Create Relay Node Architecture (8 hours)
**File:** `backend/src/tor/relayNode.js`

**What to build:**
- RelayNode class representing a virtual relay
- Three types: Entry Node, Middle Node, Exit Node
- Each node should store:
  - Node ID
  - Node type (entry/middle/exit)
  - Encryption keys (public/private key pairs)
  - Current status (active/inactive)
  - Packet queue

**Key Functions:**
```javascript
class RelayNode {
  constructor(id, type)
  receivePacket(encryptedPacket)
  decryptLayer(packet)
  forwardPacket(packet, nextNode)
  getNodeInfo()
}
```

**Example Implementation:**
```javascript
import crypto from 'crypto';

export class RelayNode {
  constructor(id, type) {
    this.id = id;
    this.type = type; // 'entry', 'middle', or 'exit'
    this.status = 'active';
    
    // Generate RSA key pair for this node
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });
    
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  decryptLayer(encryptedData) {
    // Decrypt one layer using this node's private key
    const decrypted = crypto.privateDecrypt(
      this.privateKey,
      Buffer.from(encryptedData, 'base64')
    );
    return JSON.parse(decrypted.toString());
  }
  
  // ... more methods
}
```

---

#### 2. Build Circuit Builder (6 hours)
**File:** `backend/src/tor/circuitBuilder.js`

**What to build:**
- Random path selection algorithm
- Select 3 relay nodes: Entry → Middle → Exit
- Create circuit ID for tracking
- Return circuit configuration

**Key Functions:**
```javascript
createCircuit(availableNodes)
selectRandomNodes(nodes, count)
buildCircuitPath(entryNode, middleNode, exitNode)
getCircuitInfo(circuitId)
```

**Algorithm:**
1. Randomly select one Entry node
2. Randomly select one Middle node (different from Entry)
3. Randomly select one Exit node (different from Entry and Middle)
4. Generate unique circuit ID
5. Return circuit configuration

---

#### 3. Implement Encryption Layer (7 hours)
**File:** `backend/src/tor/encryptionLayer.js`

**What to build:**
- Multi-layer onion encryption
- Encrypt message with Exit key → Middle key → Entry key
- Each layer contains next hop information

**Key Functions:**
```javascript
createOnionPacket(message, circuit, sender, receiver)
encryptLayer(data, publicKey)
buildPacketLayers(innerData, relayNodes)
```

**Onion Structure:**
```javascript
// Layer 3 (innermost - for Exit Node)
{
  message: "Hello",
  sender: "userId1",
  receiver: "userId2",
  timestamp: "..."
}

// Layer 2 (for Middle Node)
{
  encryptedPayload: "...",  // Layer 3 encrypted
  nextHop: "exitNodeId"
}

// Layer 1 (outermost - for Entry Node)
{
  encryptedPayload: "...",  // Layer 2 encrypted
  nextHop: "middleNodeId"
}
```

---

#### 4. Create Routing Engine (5 hours)
**File:** `backend/src/tor/routingEngine.js`

**What to build:**
- Message forwarding logic
- Track packet progress through circuit
- Handle packet delivery to final destination

**Key Functions:**
```javascript
routePacket(packet, circuit)
forwardToNextNode(packet, nextNodeId)
deliverMessage(decryptedMessage, receiverId)
trackPacketProgress(packetId, currentNode)
```

---

#### 5. Add Latency Simulator (2 hours)
**File:** `backend/src/tor/latencySimulator.js`

**What to build:**
- Simulate realistic network delays
- Random delay between 50-200ms per hop
- Optional: Different delays for different node types

**Key Functions:**
```javascript
simulateLatency(nodeType)
addDelay(callback, delayMs)
getAverageLatency()
```

---

#### 6. Initialize Relay Network (2 hours)
**File:** `backend/src/tor/torConfig.js`

**What to build:**
- Initialize 5-7 relay nodes on server startup
- 2 Entry nodes, 3 Middle nodes, 2 Exit nodes
- Export relay pool for circuit building

---

#### 7. Modify Message Controller (4 hours)
**File:** `backend/src/controllers/message.controller.js`

**Changes needed:**
- Replace direct message sending with Tor routing
- Create circuit before sending message
- Build onion packet
- Send to Entry node instead of directly to receiver

---

#### 8. Update Socket Handler (2 hours)
**File:** `backend/src/lib/socket.js`

**Changes needed:**
- Add relay node event handlers
- Emit packet progress events
- Handle packet forwarding between nodes

---

### Dependencies to Install
```bash
cd backend
npm install uuid
# crypto is built-in to Node.js
```

### Testing Strategy
1. Test individual relay node encryption/decryption
2. Test circuit building with random selection
3. Test end-to-end message routing
4. Verify packet arrives at correct destination
5. Measure latency addition

### Git Branch
```bash
git checkout -b feature/tor-routing
```

---

## 👥 Team Member 2: Intrusion Detection System Engineer

**Role:** Backend - Security & Monitoring  
**Complexity:** ⭐⭐⭐⭐⭐ (Very High - requires security knowledge and AI/ML)  
**Estimated Time:** 28-32 hours

### Responsibilities
Build the IDS module that analyzes packets at each relay node and detects/blocks suspicious traffic.

### Files to Create

```
backend/src/ids/packetInspector.js
backend/src/ids/ruleEngine.js
backend/src/ids/anomalyDetector.js
backend/src/ids/actionHandler.js
backend/src/ids/eventLogger.js
backend/src/ids/idsConfig.js
backend/src/models/packetLog.model.js
backend/src/models/idsEvent.model.js
backend/src/routes/ids.route.js
backend/src/controllers/ids.controller.js
```

### Files to Modify

```
backend/src/tor/relayNode.js (add IDS integration)
backend/src/index.js (add IDS routes)
```

### Detailed Task Breakdown

#### 1. Create Packet Inspector (6 hours)
**File:** `backend/src/ids/packetInspector.js`

**What to build:**
- Analyze packet structure and content
- Extract packet metadata
- Calculate risk score
- Validate packet format

**Key Functions:**
```javascript
inspectPacket(packet, nodeId)
extractMetadata(packet)
validateStructure(packet)
calculatePacketSize(packet)
detectMalformation(packet)
```

**Analysis Checks:**
```javascript
// Check packet size
if (packetSize > 1048576) { // 1MB
  flags.push('OVERSIZED_PACKET');
  riskScore += 40;
}

// Check JSON structure
try {
  JSON.parse(packet.payload);
} catch (e) {
  flags.push('MALFORMED_JSON');
  riskScore += 60;
}

// Check for suspicious patterns
if (containsSQLInjection(packet.text)) {
  flags.push('SQL_INJECTION_ATTEMPT');
  riskScore += 80;
}
```

---

#### 2. Build Rule Engine (7 hours)
**File:** `backend/src/ids/ruleEngine.js`

**What to build:**
- Define detection rules
- Rule evaluation engine
- Configurable rule sets
- Priority-based rule matching

**Detection Rules to Implement:**

| Rule ID | Rule Name | Condition | Risk Score | Action |
|---------|-----------|-----------|------------|--------|
| R001 | Oversized Packet | size > 1MB | 40 | Flag |
| R002 | Malformed JSON | Invalid structure | 60 | Block |
| R003 | SQL Injection | Suspicious SQL patterns | 80 | Block |
| R004 | Rate Limiting | >10 msgs/sec from user | 50 | Flag |
| R005 | XSS Attempt | Script tags detected | 70 | Block |
| R006 | Excessive Images | >5 images in 1 min | 30 | Flag |
| R007 | Null Bytes | Contains \0 characters | 65 | Block |
| R008 | Unusual Characters | Non-UTF8 encoding | 45 | Flag |

**Key Functions:**
```javascript
evaluateRules(packet, metadata)
checkRule(rule, packet)
getRuleById(ruleId)
addCustomRule(rule)
```

**Example Rule Structure:**
```javascript
const rules = [
  {
    id: 'R001',
    name: 'Oversized Packet',
    check: (packet) => packet.size > 1048576,
    riskScore: 40,
    action: 'flag',
    description: 'Packet exceeds 1MB size limit'
  },
  // ... more rules
];
```

---

#### 3. Implement Anomaly Detector (8 hours)
**File:** `backend/src/ids/anomalyDetector.js`

**What to build:**
- Statistical anomaly detection
- Simple ML model (optional but recommended)
- Baseline traffic profiling
- Behavioral analysis

**Approaches:**

**A. Statistical Method (Simpler):**
```javascript
// Track normal behavior
- Average message size: 500 bytes
- Average messages per minute: 5
- Common message patterns

// Detect deviations
if (currentSize > avgSize * 3) {
  anomalyScore += 50;
}
```

**B. Machine Learning Method (Advanced):**
```javascript
// Use brain.js or ml-regression
import brain from 'brain.js';

// Train on normal traffic
const net = new brain.NeuralNetwork();
net.train(normalTrafficData);

// Predict if packet is anomalous
const result = net.run(packetFeatures);
if (result < 0.3) { // Low confidence = anomaly
  anomalyScore += 60;
}
```

**Key Functions:**
```javascript
detectAnomaly(packet, userHistory)
trainModel(trainingData)
extractFeatures(packet)
updateBaseline(newData)
calculateAnomalyScore(packet)
```

---

#### 4. Create Action Handler (4 hours)
**File:** `backend/src/ids/actionHandler.js`

**What to build:**
- Decision engine (allow/block/flag)
- Action execution
- Logging and notification

**Action Logic:**
```javascript
if (riskScore >= 80) {
  action = 'BLOCK';
} else if (riskScore >= 50) {
  action = 'FLAG';
} else {
  action = 'ALLOW';
}
```

**Key Functions:**
```javascript
determineAction(riskScore, flags)
executeAction(action, packet)
blockPacket(packet, reason)
flagPacket(packet, reason)
allowPacket(packet)
notifyAdmin(event)
```

---

#### 5. Build Event Logger (5 hours)
**File:** `backend/src/ids/eventLogger.js`

**What to build:**
- Log all IDS events to database
- Emit real-time events to frontend
- Generate event summaries
- Query logged events

**Key Functions:**
```javascript
logEvent(eventData)
emitToFrontend(event)
getEventsByTimeRange(startTime, endTime)
getEventStatistics()
```

---

#### 6. Create Database Models (3 hours)

**File:** `backend/src/models/packetLog.model.js`

**Schema:**
```javascript
{
  packetId: String (UUID),
  timestamp: Date,
  relayNode: String ('entry'/'middle'/'exit'),
  senderId: ObjectId,
  receiverId: ObjectId,
  size: Number,
  action: String ('allowed'/'blocked'/'flagged'),
  riskScore: Number,
  flags: [String],
  circuitId: String
}
```

**File:** `backend/src/models/idsEvent.model.js`

**Schema:**
```javascript
{
  eventId: String (UUID),
  timestamp: Date,
  eventType: String ('packet_blocked'/'suspicious_activity'/etc),
  severity: String ('low'/'medium'/'high'/'critical'),
  relayNode: String,
  packetId: String,
  ruleTriggered: [String],
  details: Object,
  resolved: Boolean
}
```

---

#### 7. Create IDS API Routes (3 hours)
**File:** `backend/src/routes/ids.route.js`

**Endpoints:**
```javascript
GET  /api/ids/events           // Get all IDS events
GET  /api/ids/events/:id       // Get specific event
GET  /api/ids/statistics       // Get IDS statistics
GET  /api/ids/packets          // Get packet logs
POST /api/ids/rules            // Add custom rule
GET  /api/ids/rules            // Get all rules
```

**File:** `backend/src/controllers/ids.controller.js`

---

#### 8. Create IDS Configuration (2 hours)
**File:** `backend/src/ids/idsConfig.js`

**What to include:**
- Enable/disable IDS
- Rule configurations
- Threshold settings
- Logging preferences

---

### Dependencies to Install
```bash
cd backend
npm install brain.js        # For ML-based detection (optional)
npm install ml-regression   # Alternative ML library
npm install uuid
```

### Testing Strategy
1. Test each detection rule individually
2. Send normal packets → should pass
3. Send oversized packets → should block
4. Send malformed packets → should block
5. Test rate limiting with rapid requests
6. Verify all events are logged correctly
7. Test anomaly detector with edge cases

### Git Branch
```bash
git checkout -b feature/intrusion-detection
```

---

## 👥 Team Member 3: Visualization Dashboard Developer

**Role:** Frontend - Network Visualization & Analytics  
**Complexity:** ⭐⭐⭐⭐ (High - requires advanced UI/UX and animation)  
**Estimated Time:** 26-30 hours

### Responsibilities
Create an interactive dashboard that visualizes the Tor network, message flow, and IDS analytics in real-time.

### Files to Create

```
frontend/src/pages/NetworkVisualizationPage.jsx
frontend/src/components/NetworkTopology.jsx
frontend/src/components/PacketFlowAnimation.jsx
frontend/src/components/IDSAnalytics.jsx
frontend/src/components/RelayStatus.jsx
frontend/src/components/PacketInspector.jsx
frontend/src/components/RelayNodeCard.jsx
frontend/src/components/MessagePathTracer.jsx
frontend/src/components/SecurityAlerts.jsx
frontend/src/store/useNetworkStore.js
frontend/src/lib/networkSocket.js
```

### Files to Modify

```
frontend/src/App.jsx (add new route)
frontend/src/components/Navbar.jsx (add visualization link)
```

### Detailed Task Breakdown

#### 1. Create Main Visualization Page (4 hours)
**File:** `frontend/src/pages/NetworkVisualizationPage.jsx`

**What to build:**
- Main dashboard layout
- Grid layout with multiple sections
- Real-time data updates
- Responsive design

**Layout Structure:**
```
┌─────────────────────────────────────┐
│     Network Topology (Top Half)     │
│  [Visual graph of relay nodes]      │
│                                      │
├──────────────┬──────────────────────┤
│ IDS Analytics│   Relay Status       │
│ [Charts]     │   [Node cards]       │
├──────────────┼──────────────────────┤
│ Live Packets │   Security Alerts    │
│ [Table]      │   [Alert list]       │
└──────────────┴──────────────────────┘
```

**Example:**
```jsx
export default function NetworkVisualizationPage() {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Network Topology - Full Width */}
        <div className="col-span-1 bg-base-100 rounded-lg p-6 h-96">
          <NetworkTopology />
        </div>
        
        {/* Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IDSAnalytics />
          <RelayStatus />
        </div>
        
        {/* Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PacketInspector />
          <SecurityAlerts />
        </div>
      </div>
    </div>
  );
}
```

---

#### 2. Build Network Topology Visualization (8 hours)
**File:** `frontend/src/components/NetworkTopology.jsx`

**What to build:**
- Interactive node graph
- Entry, Middle, Exit nodes displayed
- Connections between nodes
- Animated message flow along edges

**Recommended Library:** `react-flow` or `d3.js`

**Using react-flow:**
```bash
npm install reactflow
```

**Example Implementation:**
```jsx
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function NetworkTopology() {
  const nodes = [
    // Entry Nodes
    { 
      id: 'entry-1', 
      type: 'custom',
      data: { label: 'Entry 1', type: 'entry', status: 'active' },
      position: { x: 100, y: 50 }
    },
    // Middle Nodes
    { 
      id: 'middle-1', 
      data: { label: 'Middle 1', type: 'middle', status: 'active' },
      position: { x: 300, y: 100 }
    },
    // Exit Nodes
    { 
      id: 'exit-1', 
      data: { label: 'Exit 1', type: 'exit', status: 'active' },
      position: { x: 500, y: 50 }
    },
    // User nodes
    { 
      id: 'user-sender', 
      data: { label: 'You', type: 'user' },
      position: { x: 0, y: 100 }
    },
    { 
      id: 'user-receiver', 
      data: { label: 'Receiver', type: 'user' },
      position: { x: 650, y: 100 }
    }
  ];

  const edges = [
    { id: 'e1', source: 'user-sender', target: 'entry-1', animated: true },
    { id: 'e2', source: 'entry-1', target: 'middle-1', animated: true },
    { id: 'e3', source: 'middle-1', target: 'exit-1', animated: true },
    { id: 'e4', source: 'exit-1', target: 'user-receiver', animated: true }
  ];

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

**Features to add:**
- Color-code nodes by type (Entry=blue, Middle=green, Exit=orange)
- Show node status (active/inactive)
- Highlight active circuit path
- Display packet count per node

---

#### 3. Create Packet Flow Animation (7 hours)
**File:** `frontend/src/components/PacketFlowAnimation.jsx`

**What to build:**
- Animated dots moving along circuit path
- Show packet progress through nodes
- Display decryption at each hop
- Show latency delays

**Recommended Library:** `framer-motion`

```bash
npm install framer-motion
```

**Example:**
```jsx
import { motion } from 'framer-motion';

export default function PacketFlowAnimation({ packet, circuit }) {
  const [currentNode, setCurrentNode] = useState(0);
  
  return (
    <div className="relative">
      {/* Animated packet */}
      <motion.div
        className="absolute w-4 h-4 bg-primary rounded-full"
        animate={{
          x: nodePositions[currentNode].x,
          y: nodePositions[currentNode].y
        }}
        transition={{ duration: 1 }}
      >
        {/* Packet info tooltip */}
        <div className="tooltip">
          <p>Packet ID: {packet.id}</p>
          <p>Current: {circuit[currentNode]}</p>
        </div>
      </motion.div>
    </div>
  );
}
```

**Animation Flow:**
1. Packet starts at sender
2. Moves to Entry node → pause → decrypt layer 1
3. Moves to Middle node → pause → decrypt layer 2
4. Moves to Exit node → pause → decrypt layer 3
5. Moves to receiver → delivered

---

#### 4. Build IDS Analytics Dashboard (5 hours)
**File:** `frontend/src/components/IDSAnalytics.jsx`

**What to build:**
- Real-time charts and graphs
- Packet statistics (allowed/blocked/flagged)
- Threat level indicator
- Time-series graphs

**Recommended Library:** `recharts`

```bash
npm install recharts
```

**Charts to create:**
1. **Pie Chart:** Packet distribution (allowed/blocked/flagged)
2. **Line Chart:** Packets over time
3. **Bar Chart:** Threats by type
4. **Gauge Chart:** Current threat level

**Example:**
```jsx
import { PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function IDSAnalytics() {
  const packetStats = useNetworkStore(state => state.packetStats);
  
  const pieData = [
    { name: 'Allowed', value: packetStats.allowed, color: '#00C853' },
    { name: 'Flagged', value: packetStats.flagged, color: '#FFB300' },
    { name: 'Blocked', value: packetStats.blocked, color: '#D32F2F' }
  ];

  return (
    <div className="bg-base-100 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">IDS Analytics</h3>
      
      {/* Pie Chart */}
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name">
          {pieData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="stat">
          <div className="stat-title">Allowed</div>
          <div className="stat-value text-success">{packetStats.allowed}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Flagged</div>
          <div className="stat-value text-warning">{packetStats.flagged}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Blocked</div>
          <div className="stat-value text-error">{packetStats.blocked}</div>
        </div>
      </div>
    </div>
  );
}
```

---

#### 5. Create Relay Status Monitor (4 hours)
**File:** `frontend/src/components/RelayStatus.jsx`

**What to build:**
- Display all relay nodes
- Show node health (CPU, packets processed, uptime)
- Color-coded status indicators
- Click to view node details

**File:** `frontend/src/components/RelayNodeCard.jsx`

**Example:**
```jsx
export default function RelayNodeCard({ node }) {
  const statusColor = node.status === 'active' ? 'bg-success' : 'bg-error';
  
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusColor}`} />
          <h3 className="card-title">{node.name}</h3>
        </div>
        
        <div className="badge badge-outline">{node.type}</div>
        
        <div className="stats stats-vertical">
          <div className="stat">
            <div className="stat-title">Packets</div>
            <div className="stat-value text-sm">{node.packetsProcessed}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Uptime</div>
            <div className="stat-value text-sm">{node.uptime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

#### 6. Build Packet Inspector (3 hours)
**File:** `frontend/src/components/PacketInspector.jsx`

**What to build:**
- Live table of recent packets
- Click to view packet details
- Filter by status (all/allowed/blocked/flagged)
- Search functionality

**Example:**
```jsx
export default function PacketInspector() {
  const packets = useNetworkStore(state => state.recentPackets);
  
  return (
    <div className="bg-base-100 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Live Packet Monitor</h3>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Time</th>
              <th>Packet ID</th>
              <th>Relay</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {packets.map(packet => (
              <tr key={packet.id}>
                <td>{new Date(packet.timestamp).toLocaleTimeString()}</td>
                <td className="font-mono text-xs">{packet.id.slice(0, 8)}</td>
                <td>{packet.relayNode}</td>
                <td>{(packet.size / 1024).toFixed(2)} KB</td>
                <td>
                  <div className={`badge badge-${getStatusColor(packet.action)}`}>
                    {packet.action}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

#### 7. Create Security Alerts Component (3 hours)
**File:** `frontend/src/components/SecurityAlerts.jsx`

**What to build:**
- Real-time alert notifications
- Alert severity levels
- Expandable alert details
- Clear/dismiss alerts

---

#### 8. Build Network State Management (2 hours)
**File:** `frontend/src/store/useNetworkStore.js`

**What to build:**
- Zustand store for network data
- State for nodes, packets, IDS events
- Actions to update state

**Example:**
```jsx
import { create } from 'zustand';

export const useNetworkStore = create((set) => ({
  relayNodes: [],
  activeCircuit: null,
  recentPackets: [],
  packetStats: { allowed: 0, blocked: 0, flagged: 0 },
  idsEvents: [],
  
  setRelayNodes: (nodes) => set({ relayNodes: nodes }),
  addPacket: (packet) => set((state) => ({
    recentPackets: [packet, ...state.recentPackets].slice(0, 50)
  })),
  updatePacketStats: (stats) => set({ packetStats: stats }),
  addIDSEvent: (event) => set((state) => ({
    idsEvents: [event, ...state.idsEvents].slice(0, 100)
  }))
}));
```

---

#### 9. Setup WebSocket Connection (2 hours)
**File:** `frontend/src/lib/networkSocket.js`

**What to build:**
- Connect to backend WebSocket
- Listen for network events
- Update store on events

**Events to listen for:**
```javascript
socket.on('packet_processed', (data) => {
  useNetworkStore.getState().addPacket(data);
});

socket.on('ids_event', (event) => {
  useNetworkStore.getState().addIDSEvent(event);
});

socket.on('relay_status_update', (node) => {
  // Update relay node status
});
```

---

### Dependencies to Install
```bash
cd frontend
npm install reactflow
npm install recharts
npm install framer-motion
```

### Testing Strategy
1. Test each component in isolation
2. Verify real-time updates work
3. Test responsiveness on mobile
4. Check animation performance
5. Verify chart data accuracy
6. Test with large packet volumes

### Git Branch
```bash
git checkout -b feature/visualization-dashboard
```

---

## 👥 Team Member 4: Integration & API Engineer

**Role:** Full-Stack - Integration & Coordination  
**Complexity:** ⭐⭐⭐ (Medium - requires coordination skills)  
**Estimated Time:** 22-26 hours

### Responsibilities
Connect all system components, create unified APIs, implement packet tracking, and ensure smooth data flow between frontend and backend.

### Files to Create

```
backend/src/controllers/network.controller.js
backend/src/routes/network.route.js
backend/src/lib/eventBus.js
backend/src/lib/packetTracker.js
backend/src/services/networkService.js
frontend/src/lib/networkSocket.js
frontend/src/store/usePacketStore.js
frontend/src/hooks/useNetworkData.js
```

### Files to Modify

```
backend/src/index.js (add routes)
backend/src/lib/socket.js (add events)
frontend/src/App.jsx (add routes)
frontend/src/components/Navbar.jsx (add link)
```

### Detailed Task Breakdown

#### 1. Create Event Bus System (4 hours)
**File:** `backend/src/lib/eventBus.js`

**What to build:**
- Central event emission system
- Emit events for packet processing
- Emit IDS events
- Emit relay status updates

**Key Functions:**
```javascript
import EventEmitter from 'events';

class NetworkEventBus extends EventEmitter {
  emitPacketEvent(event, data) {
    this.emit(event, data);
    this.logEvent(event, data);
  }
  
  emitIDSEvent(event, data) {
    this.emit(`ids:${event}`, data);
    this.logEvent(`ids:${event}`, data);
  }
  
  emitRelayEvent(nodeId, event, data) {
    this.emit(`relay:${nodeId}:${event}`, data);
  }
}

export const eventBus = new NetworkEventBus();
```

**Events to emit:**
- `packet:created` - New packet created
- `packet:encrypted` - Packet encrypted
- `packet:relay:entry` - Packet at entry node
- `packet:relay:middle` - Packet at middle node
- `packet:relay:exit` - Packet at exit node
- `packet:delivered` - Packet delivered
- `ids:packet_inspected` - IDS analyzed packet
- `ids:packet_blocked` - IDS blocked packet
- `ids:packet_flagged` - IDS flagged packet
- `relay:status_change` - Relay node status changed

---

#### 2. Build Packet Tracker (5 hours)
**File:** `backend/src/lib/packetTracker.js`

**What to build:**
- Track packet journey through network
- Store packet timeline
- Query packet history
- Calculate latency metrics

**Key Functions:**
```javascript
class PacketTracker {
  constructor() {
    this.packets = new Map(); // packetId -> packet journey
  }

  createPacket(packetId, sender, receiver, circuitId) {
    this.packets.set(packetId, {
      id: packetId,
      sender,
      receiver,
      circuitId,
      status: 'created',
      timeline: [{
        event: 'created',
        timestamp: Date.now(),
        node: 'sender'
      }],
      totalLatency: 0
    });
  }

  trackEvent(packetId, event, nodeId, data = {}) {
    const packet = this.packets.get(packetId);
    if (!packet) return;

    const timestamp = Date.now();
    packet.timeline.push({
      event,
      timestamp,
      node: nodeId,
      ...data
    });

    // Calculate latency
    if (packet.timeline.length > 1) {
      const lastEvent = packet.timeline[packet.timeline.length - 2];
      packet.totalLatency += timestamp - lastEvent.timestamp;
    }

    // Emit event to frontend
    eventBus.emit('packet:progress', {
      packetId,
      currentNode: nodeId,
      event,
      timeline: packet.timeline
    });
  }

  getPacketJourney(packetId) {
    return this.packets.get(packetId);
  }

  getActivePackets() {
    return Array.from(this.packets.values())
      .filter(p => p.status !== 'delivered' && p.status !== 'blocked');
  }
}

export const packetTracker = new PacketTracker();
```

---

#### 3. Create Network API Controller (5 hours)
**File:** `backend/src/controllers/network.controller.js`

**What to build:**
- API endpoints for network data
- Return relay node information
- Return packet statistics
- Return circuit information

**API Endpoints:**

```javascript
// Get all relay nodes
export const getRelayNodes = async (req, res) => {
  try {
    const nodes = relayPool.getAllNodes();
    const nodesInfo = nodes.map(node => ({
      id: node.id,
      type: node.type,
      status: node.status,
      packetsProcessed: node.packetsProcessed || 0,
      uptime: Date.now() - node.startTime,
      publicKey: node.publicKey.export({ type: 'pkcs1', format: 'pem' })
    }));
    
    res.json(nodesInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get active circuits
export const getActiveCircuits = async (req, res) => {
  try {
    const circuits = circuitBuilder.getActiveCircuits();
    res.json(circuits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get packet statistics
export const getPacketStatistics = async (req, res) => {
  try {
    const stats = await PacketLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const formattedStats = {
      allowed: 0,
      blocked: 0,
      flagged: 0
    };
    
    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });
    
    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get packet journey
export const getPacketJourney = async (req, res) => {
  try {
    const { packetId } = req.params;
    const journey = packetTracker.getPacketJourney(packetId);
    
    if (!journey) {
      return res.status(404).json({ error: 'Packet not found' });
    }
    
    res.json(journey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get network health
export const getNetworkHealth = async (req, res) => {
  try {
    const nodes = relayPool.getAllNodes();
    const activeNodes = nodes.filter(n => n.status === 'active').length;
    const totalNodes = nodes.length;
    const activePackets = packetTracker.getActivePackets().length;
    
    const recentEvents = await IDSEvent.find()
      .sort({ timestamp: -1 })
      .limit(10);
    
    res.json({
      health: activeNodes === totalNodes ? 'healthy' : 'degraded',
      activeNodes,
      totalNodes,
      activePackets,
      recentThreats: recentEvents.filter(e => e.severity === 'high').length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

#### 4. Create Network Routes (2 hours)
**File:** `backend/src/routes/network.route.js`

```javascript
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getRelayNodes,
  getActiveCircuits,
  getPacketStatistics,
  getPacketJourney,
  getNetworkHealth
} from '../controllers/network.controller.js';

const router = express.Router();

router.get('/nodes', protectRoute, getRelayNodes);
router.get('/circuits', protectRoute, getActiveCircuits);
router.get('/statistics', protectRoute, getPacketStatistics);
router.get('/packets/:packetId', protectRoute, getPacketJourney);
router.get('/health', protectRoute, getNetworkHealth);

export default router;
```

---

#### 5. Integrate WebSocket Events (4 hours)
**File:** `backend/src/lib/socket.js` (modify)

**What to add:**
- Listen to eventBus
- Emit events to frontend clients
- Handle room-based events

```javascript
// Add to socket.js

import { eventBus } from './eventBus.js';

// Listen to eventBus and emit to frontend
eventBus.on('packet:progress', (data) => {
  io.emit('network:packet_progress', data);
});

eventBus.on('ids:packet_blocked', (data) => {
  io.emit('network:ids_event', {
    type: 'blocked',
    ...data
  });
});

eventBus.on('ids:packet_flagged', (data) => {
  io.emit('network:ids_event', {
    type: 'flagged',
    ...data
  });
});

eventBus.on('relay:status_change', (data) => {
  io.emit('network:relay_status', data);
});

// Emit periodic network stats
setInterval(async () => {
  const stats = await getPacketStatsFromDB();
  io.emit('network:statistics_update', stats);
}, 5000); // Every 5 seconds
```

---

#### 6. Create Frontend Network Socket (3 hours)
**File:** `frontend/src/lib/networkSocket.js`

**What to build:**
- Connect to backend WebSocket
- Listen for network events
- Update stores automatically

```javascript
import { io } from 'socket.io-client';
import { useNetworkStore } from '../store/useNetworkStore';
import { usePacketStore } from '../store/usePacketStore';

let socket = null;

export const connectNetworkSocket = (userId) => {
  if (socket?.connected) return socket;

  socket = io('http://localhost:5001', {
    query: { userId }
  });

  // Packet progress events
  socket.on('network:packet_progress', (data) => {
    usePacketStore.getState().updatePacketProgress(data);
  });

  // IDS events
  socket.on('network:ids_event', (event) => {
    useNetworkStore.getState().addIDSEvent(event);
  });

  // Relay status updates
  socket.on('network:relay_status', (data) => {
    useNetworkStore.getState().updateRelayStatus(data);
  });

  // Statistics updates
  socket.on('network:statistics_update', (stats) => {
    useNetworkStore.getState().updatePacketStats(stats);
  });

  socket.on('connect', () => {
    console.log('Network socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Network socket disconnected');
  });

  return socket;
};

export const disconnectNetworkSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
```

---

#### 7. Create Packet Store (3 hours)
**File:** `frontend/src/store/usePacketStore.js`

```javascript
import { create } from 'zustand';

export const usePacketStore = create((set, get) => ({
  activePackets: new Map(),
  completedPackets: [],
  
  addPacket: (packet) => set((state) => {
    const newPackets = new Map(state.activePackets);
    newPackets.set(packet.id, packet);
    return { activePackets: newPackets };
  }),
  
  updatePacketProgress: (data) => set((state) => {
    const packet = state.activePackets.get(data.packetId);
    if (!packet) return state;
    
    const updatedPacket = {
      ...packet,
      currentNode: data.currentNode,
      timeline: data.timeline
    };
    
    const newPackets = new Map(state.activePackets);
    newPackets.set(data.packetId, updatedPacket);
    
    return { activePackets: newPackets };
  }),
  
  completePacket: (packetId) => set((state) => {
    const packet = state.activePackets.get(packetId);
    if (!packet) return state;
    
    const newPackets = new Map(state.activePackets);
    newPackets.delete(packetId);
    
    return {
      activePackets: newPackets,
      completedPackets: [...state.completedPackets, packet].slice(-100)
    };
  }),
  
  getPacketById: (packetId) => {
    return get().activePackets.get(packetId);
  }
}));
```

---

#### 8. Create Network Hook (2 hours)
**File:** `frontend/src/hooks/useNetworkData.js`

**What to build:**
- Custom hook to fetch network data
- Automatic refetching
- Error handling

```javascript
import { useEffect } from 'react';
import { useNetworkStore } from '../store/useNetworkStore';
import axiosInstance from '../lib/axios';

export const useNetworkData = () => {
  const { setRelayNodes, updatePacketStats } = useNetworkStore();

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // Fetch relay nodes
        const nodesRes = await axiosInstance.get('/api/network/nodes');
        setRelayNodes(nodesRes.data);

        // Fetch statistics
        const statsRes = await axiosInstance.get('/api/network/statistics');
        updatePacketStats(statsRes.data);
      } catch (error) {
        console.error('Failed to fetch network data:', error);
      }
    };

    fetchNetworkData();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchNetworkData, 10000);
    
    return () => clearInterval(interval);
  }, [setRelayNodes, updatePacketStats]);
};
```

---

#### 9. Update App Routes (2 hours)
**File:** `frontend/src/App.jsx` (modify)

**Add route:**
```jsx
import NetworkVisualizationPage from './pages/NetworkVisualizationPage';

// In routes
<Route path="/network" element={<NetworkVisualizationPage />} />
```

**File:** `frontend/src/components/Navbar.jsx` (modify)

**Add navigation link:**
```jsx
<Link to="/network" className="btn btn-ghost">
  Network Visualization
</Link>
```

---

#### 10. Backend Index Integration (1 hour)
**File:** `backend/src/index.js` (modify)

**Add routes:**
```javascript
import networkRoutes from './routes/network.route.js';

app.use('/api/network', networkRoutes);
```

---

#### 11. Testing & Documentation (2 hours)

**Create test scripts:**
- Test API endpoints
- Test WebSocket events
- Test data flow end-to-end
- Document integration points

**Create integration documentation:**
```markdown
# Integration Guide

## API Endpoints
- GET /api/network/nodes
- GET /api/network/statistics
- etc.

## WebSocket Events
- network:packet_progress
- network:ids_event
- etc.

## Data Flow
1. User sends message
2. Backend creates circuit
3. Packet routed through relays
4. IDS inspects at each node
5. Events emitted to frontend
6. UI updates in real-time
```

---

### Dependencies to Install
No additional dependencies required (uses existing packages)

### Testing Strategy
1. Test all API endpoints with Postman
2. Test WebSocket event emission
3. Verify data synchronization
4. Test with multiple concurrent messages
5. Check error handling
6. Performance testing with load

### Git Branch
```bash
git checkout -b feature/integration-api
```

---

## 📊 Complexity & Time Comparison

| Member | Role | Complexity | Est. Hours | Key Challenge |
|--------|------|------------|------------|---------------|
| Member 1 | Tor Routing | ⭐⭐⭐⭐ | 25-30 | Encryption & routing logic |
| Member 2 | IDS System | ⭐⭐⭐⭐⭐ | 28-32 | Security rules & ML detection |
| Member 3 | Visualization | ⭐⭐⭐⭐ | 26-30 | Real-time animations & charts |
| Member 4 | Integration | ⭐⭐⭐ | 22-26 | Coordination & data flow |

**Total Team Effort:** 101-118 hours (~25-30 hours per person)

---

## 🔄 Collaboration Workflow

### Daily Standup (15 minutes)
- What did you complete yesterday?
- What will you work on today?
- Any blockers?

### Weekly Integration (Fridays)
- Merge feature branches to `dev` branch
- Test integrated system
- Fix integration issues

### Git Workflow

```bash
# Initial setup
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus

# Create your feature branch
git checkout -b feature/your-feature-name

# Work on your tasks...

# Commit frequently
git add .
git commit -m "descriptive message"

# Push to your branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Request review from team members

# After approval, merge to dev
git checkout dev
git merge feature/your-feature-name
```

### Branch Structure
```
main (production)
 └── dev (integration)
      ├── feature/tor-routing (Member 1)
      ├── feature/intrusion-detection (Member 2)
      ├── feature/visualization-dashboard (Member 3)
      └── feature/integration-api (Member 4)
```

---

## 🎯 Milestones & Deadlines

### Week 1: Foundation
- [ ] All file structures created
- [ ] Basic relay node system (Member 1)
- [ ] IDS framework setup (Member 2)
- [ ] Dashboard layout (Member 3)
- [ ] Event bus system (Member 4)

### Week 2: Core Features
- [ ] Circuit building works (Member 1)
- [ ] Packet inspection working (Member 2)
- [ ] Network graph displays (Member 3)
- [ ] APIs functional (Member 4)

### Week 3: Integration
- [ ] Messages route through Tor (Member 1)
- [ ] IDS blocks threats (Member 2)
- [ ] Live animations work (Member 3)
- [ ] All components connected (Member 4)

### Week 4: Polish
- [ ] Full system testing
- [ ] Bug fixes
- [ ] Documentation
- [ ] Demo preparation

---

## 🆘 Getting Help

### If You're Blocked
1. Check documentation in respective files
2. Ask in team chat
3. Schedule pair programming session
4. Review example code in this document

### Resources
- **Encryption:** Node.js crypto docs
- **React Flow:** https://reactflow.dev/
- **Charts:** https://recharts.org/
- **Socket.io:** https://socket.io/docs/

### Code Review Checklist
- [ ] Code follows project structure
- [ ] Functions are documented
- [ ] Error handling implemented
- [ ] No console.logs in production
- [ ] Code is tested
- [ ] Git commit messages are clear

---

## ✅ Quick Start Commands

```bash
# Clone repository
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus

# Install dependencies
npm install

# Create your feature branch
git checkout -b feature/your-name

# Start development
npm run dev

# Your specific setup:

# Member 1 (Tor Routing)
cd backend
npm install uuid
mkdir -p src/tor
touch src/tor/{relayNode.js,circuitBuilder.js,encryptionLayer.js,routingEngine.js,latencySimulator.js,torConfig.js}

# Member 2 (IDS)
cd backend
npm install brain.js uuid
mkdir -p src/ids
touch src/ids/{packetInspector.js,ruleEngine.js,anomalyDetector.js,actionHandler.js,eventLogger.js,idsConfig.js}
touch src/models/{packetLog.model.js,idsEvent.model.js}
touch src/routes/ids.route.js
touch src/controllers/ids.controller.js

# Member 3 (Visualization)
cd frontend
npm install reactflow recharts framer-motion
mkdir -p src/pages src/components
touch src/pages/NetworkVisualizationPage.jsx
touch src/components/{NetworkTopology.jsx,PacketFlowAnimation.jsx,IDSAnalytics.jsx,RelayStatus.jsx,PacketInspector.jsx,SecurityAlerts.jsx}
touch src/store/useNetworkStore.js

# Member 4 (Integration)
cd backend
mkdir -p src/lib
touch src/lib/{eventBus.js,packetTracker.js}
touch src/controllers/network.controller.js
touch src/routes/network.route.js
cd ../frontend
touch src/lib/networkSocket.js
touch src/store/usePacketStore.js
touch src/hooks/useNetworkData.js
```

---

## 📝 Communication Template

**Daily Update Template:**
```
Date: [Date]
Member: [Your Name]
Role: [Your Role]

Completed:
- [ ] Task 1
- [ ] Task 2

In Progress:
- [ ] Task 3

Blockers:
- None / [Describe issue]

Tomorrow:
- [ ] Task 4
```

**Pull Request Template:**
```
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Integration
- [ ] Documentation

## Testing
- [ ] Tested locally
- [ ] No errors in console
- [ ] Follows coding standards

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #[issue number]
```

---

## 🎓 Learning Resources

### For Member 1 (Tor Routing)
- Tor Protocol: https://www.torproject.org/
- Node.js Crypto: https://nodejs.org/api/crypto.html
- Onion Routing: Wikipedia article

### For Member 2 (IDS)
- IDS Fundamentals: NIST guidelines
- Brain.js: https://brain.js.org/
- Security Patterns: OWASP

### For Member 3 (Visualization)
- React Flow Tutorial: Official docs
- D3.js: https://d3js.org/
- Animation: Framer Motion docs

### For Member 4 (Integration)
- Socket.io: Official documentation
- REST API Design: Best practices
- Event-Driven Architecture: Patterns

---

**Good luck with your project! 🚀**

**Questions? Create an issue in the GitHub repo or contact your team lead.**
