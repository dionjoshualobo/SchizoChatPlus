# 🧅 Tor Implementation - Educational Demo

## Overview

This folder contains a **complete educational simulation** of a Tor (The Onion Router) network implementation. It demonstrates key concepts of anonymous communication and onion routing without affecting the main SchizoChat application.

## 🚨 Important Notice

**This is completely isolated demo code that does NOT:**
- Interfere with the existing chat functionality
- Modify any existing database operations
- Affect the real message routing
- Impact the current user experience

**It only provides educational logging and demonstrations.**

## 📁 File Structure

```
tor-implementation/
├── index.js              # Main exports and initialization
├── relayNode.js          # Tor relay node implementation
├── circuitBuilder.js     # Circuit creation and management
├── encryptionLayer.js    # Onion encryption simulation
├── routingEngine.js      # Message routing through circuits
├── latencySimulator.js   # Network latency simulation
├── torConfig.js          # Configuration management
└── torDemo.js           # Interactive demonstration
```

## 🎯 What This Demonstrates

### 1. **Tor Network Components**
- **Entry Nodes**: First hop in the circuit
- **Middle Nodes**: Intermediate relays
- **Exit Nodes**: Final hop before destination

### 2. **Onion Routing Process**
- Multi-layer encryption (like layers of an onion)
- Each relay only knows the previous and next hop
- No single relay knows the complete path

### 3. **Circuit Building**
- Random path selection through multiple relays
- Circuit lifetime management
- Load balancing across nodes

### 4. **Security Features**
- End-to-end encryption
- Traffic analysis resistance
- Anonymity preservation

## 🚀 How to Test (Safe)

### Option 1: View Logs Only
When you restart the server, you'll see:
```
🔗 Node 1 created (Entry Node)
🔗 Node 2 created (Middle Node)
🔗 Node 3 created (Exit Node)
🔗 Node 4 created (Middle Node)
🔗 Node 5 created (Entry Node)
✅ Tor Demo Network Ready (Educational only)
```

### Option 2: Run Interactive Demo
```javascript
// In a separate terminal or testing environment
import { runQuickDemo } from './tor-implementation';

// This will show a full demonstration of:
// - Network initialization
// - Message routing through circuits
// - Performance metrics
// - Different network conditions
await runQuickDemo();
```

### Option 3: Explore Components
```javascript
import { showTorConcepts } from './tor-implementation';

// Shows conceptual overview
showTorConcepts();
```

## 📊 Demo Output Example

```
🎯 STARTING TOR NETWORK DEMONSTRATION
=====================================

🌐 Network:
   Circuits: 3-10
   Entry nodes: 3
   Middle nodes: 5
   Exit nodes: 2

📨 Message Routing Demonstration
--------------------------------
📧 Message 1:
🔗 Circuit built: entry-1 → middle-3 → exit-1
🧅 Creating onion encryption layers...
🔒 Layer 1: Encrypted for exit-1 using AES-256
🔒 Layer 2: Encrypted for middle-3 using RSA-2048
🔒 Layer 3: Encrypted for entry-1 using ChaCha20
📍 Step 1: Entry node (entry-1)
📦 Node entry-1 received packet #1
🔓 Node entry-1 decrypted layer successfully
➡️  Forwarding to middle-3
📍 Step 2: Middle node (middle-3)
📍 Step 3: Exit node (exit-1)
✅ Message delivered: "Hello, this is a test message through Tor!"
✅ Delivered in 234ms via 3 hops
```

## 🎓 Educational Value

This implementation teaches:

1. **Network Security**: Understanding anonymous communication
2. **Cryptography**: Multi-layer encryption concepts
3. **Distributed Systems**: Routing through multiple nodes
4. **Privacy Technology**: How Tor protects user anonymity
5. **Network Architecture**: Decentralized communication design

## 🔧 Technical Details

### Encryption Simulation
- RSA-2048 for asymmetric encryption
- AES-256-GCM for symmetric encryption
- ChaCha20-Poly1305 for stream encryption

### Network Simulation
- Realistic latency modeling (20-300ms)
- Packet loss simulation
- Network condition variations
- Geographic latency simulation

### Circuit Management
- 3-hop circuits (Entry → Middle → Exit)
- Circuit lifetime: 10 minutes
- Automatic circuit rotation
- Load balancing

## 🎪 Demo Scenarios

The demo includes several educational scenarios:

1. **Basic Message Routing**: Shows how messages travel through circuits
2. **Network Statistics**: Displays performance metrics
3. **Condition Testing**: Demonstrates impact of network conditions
4. **Latency Analysis**: Shows timing characteristics
5. **Security Features**: Highlights anonymity preservation

## 💡 Future Extensions

This foundation could be extended with:

- **IDS Integration**: Intrusion Detection System
- **Visualization Dashboard**: Real-time network graphs
- **Advanced Encryption**: Post-quantum cryptography
- **Traffic Analysis**: Pattern detection
- **Geographic Routing**: Location-aware path selection

## 🔗 Related Documentation

See the main documentation folder for:
- `TEAM_WORK_DISTRIBUTION.md`: Complete project roadmap
- `PROJECT_SUMMARY.md`: High-level overview
- `ARCHITECTURE.md`: System design details

---

**Remember**: This is purely educational and completely separate from the main chat application. It's designed to teach concepts without any risk to the existing system.
