# 📊 Work Distribution Summary - Visual Overview

## 👥 Team Member Assignments

```
┌─────────────────────────────────────────────────────────────────┐
│                     TEAM MEMBER 1                               │
│              Tor Routing System Engineer 🛣️                     │
├─────────────────────────────────────────────────────────────────┤
│ Complexity: ⭐⭐⭐⭐ (High)              Hours: 25-30           │
│ Branch: feature/tor-routing                                     │
├─────────────────────────────────────────────────────────────────┤
│ FILES TO CREATE:                                                │
│  ✅ backend/src/tor/relayNode.js                               │
│  ✅ backend/src/tor/circuitBuilder.js                          │
│  ✅ backend/src/tor/encryptionLayer.js                         │
│  ✅ backend/src/tor/routingEngine.js                           │
│  ✅ backend/src/tor/latencySimulator.js                        │
│  ✅ backend/src/tor/torConfig.js                               │
│                                                                 │
│ FILES TO MODIFY:                                                │
│  ✏️ backend/src/controllers/message.controller.js              │
│  ✏️ backend/src/lib/socket.js                                  │
├─────────────────────────────────────────────────────────────────┤
│ KEY TASKS:                                                      │
│  1. Create relay node architecture with RSA encryption          │
│  2. Build circuit builder (random path selection)              │
│  3. Implement multi-layer onion encryption                      │
│  4. Create routing engine for packet forwarding                 │
│  5. Add latency simulation (50-200ms per hop)                   │
├─────────────────────────────────────────────────────────────────┤
│ DEPENDENCIES: npm install uuid                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     TEAM MEMBER 2                               │
│         Intrusion Detection System Engineer 🛡️                 │
├─────────────────────────────────────────────────────────────────┤
│ Complexity: ⭐⭐⭐⭐⭐ (Very High)         Hours: 28-32          │
│ Branch: feature/intrusion-detection                             │
├─────────────────────────────────────────────────────────────────┤
│ FILES TO CREATE:                                                │
│  ✅ backend/src/ids/packetInspector.js                         │
│  ✅ backend/src/ids/ruleEngine.js                              │
│  ✅ backend/src/ids/anomalyDetector.js                         │
│  ✅ backend/src/ids/actionHandler.js                           │
│  ✅ backend/src/ids/eventLogger.js                             │
│  ✅ backend/src/ids/idsConfig.js                               │
│  ✅ backend/src/models/packetLog.model.js                      │
│  ✅ backend/src/models/idsEvent.model.js                       │
│  ✅ backend/src/routes/ids.route.js                            │
│  ✅ backend/src/controllers/ids.controller.js                  │
│                                                                 │
│ FILES TO MODIFY:                                                │
│  ✏️ backend/src/tor/relayNode.js (with Member 1)               │
├─────────────────────────────────────────────────────────────────┤
│ KEY TASKS:                                                      │
│  1. Create database models for packet logs and IDS events       │
│  2. Build rule engine with 8+ detection rules                   │
│  3. Implement packet inspector for threat analysis              │
│  4. Add AI-based anomaly detection (brain.js)                   │
│  5. Create action handler (block/flag/allow logic)              │
│  6. Build event logger for database & real-time emission        │
│  7. Create IDS API endpoints                                    │
├─────────────────────────────────────────────────────────────────┤
│ DEPENDENCIES: npm install brain.js uuid                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     TEAM MEMBER 3                               │
│          Visualization Dashboard Developer 📊                   │
├─────────────────────────────────────────────────────────────────┤
│ Complexity: ⭐⭐⭐⭐ (High)              Hours: 26-30           │
│ Branch: feature/visualization-dashboard                         │
├─────────────────────────────────────────────────────────────────┤
│ FILES TO CREATE:                                                │
│  ✅ frontend/src/pages/NetworkVisualizationPage.jsx            │
│  ✅ frontend/src/components/NetworkTopology.jsx                │
│  ✅ frontend/src/components/PacketFlowAnimation.jsx            │
│  ✅ frontend/src/components/IDSAnalytics.jsx                   │
│  ✅ frontend/src/components/RelayStatus.jsx                    │
│  ✅ frontend/src/components/PacketInspector.jsx                │
│  ✅ frontend/src/components/SecurityAlerts.jsx                 │
│  ✅ frontend/src/components/RelayNodeCard.jsx                  │
│  ✅ frontend/src/store/useNetworkStore.js                      │
│                                                                 │
│ FILES TO MODIFY:                                                │
│  ✏️ frontend/src/App.jsx                                       │
│  ✏️ frontend/src/components/Navbar.jsx                         │
├─────────────────────────────────────────────────────────────────┤
│ KEY TASKS:                                                      │
│  1. Create main dashboard page with responsive layout           │
│  2. Build network topology using react-flow                     │
│  3. Implement packet flow animation with framer-motion          │
│  4. Design IDS analytics dashboard with charts (recharts)       │
│  5. Create relay status monitor components                      │
│  6. Build packet inspector table with filtering                 │
│  7. Add security alerts component                               │
│  8. Set up network state management (Zustand)                   │
├─────────────────────────────────────────────────────────────────┤
│ DEPENDENCIES: npm install reactflow recharts framer-motion      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     TEAM MEMBER 4                               │
│            Integration & API Engineer 🔗                        │
├─────────────────────────────────────────────────────────────────┤
│ Complexity: ⭐⭐⭐ (Medium)              Hours: 22-26           │
│ Branch: feature/integration-api                                 │
├─────────────────────────────────────────────────────────────────┤
│ FILES TO CREATE:                                                │
│  ✅ backend/src/lib/eventBus.js                                │
│  ✅ backend/src/lib/packetTracker.js                           │
│  ✅ backend/src/controllers/network.controller.js              │
│  ✅ backend/src/routes/network.route.js                        │
│  ✅ frontend/src/lib/networkSocket.js                          │
│  ✅ frontend/src/store/usePacketStore.js                       │
│  ✅ frontend/src/hooks/useNetworkData.js                       │
│                                                                 │
│ FILES TO MODIFY:                                                │
│  ✏️ backend/src/index.js                                       │
│  ✏️ backend/src/lib/socket.js                                  │
│  ✏️ frontend/src/App.jsx                                       │
│  ✏️ frontend/src/components/Navbar.jsx                         │
├─────────────────────────────────────────────────────────────────┤
│ KEY TASKS:                                                      │
│  1. Create event bus for component coordination                 │
│  2. Build packet tracker to monitor message journey             │
│  3. Implement network API endpoints                             │
│  4. Set up WebSocket event system                               │
│  5. Create frontend socket connection handler                   │
│  6. Build packet state management store                         │
│  7. Add custom hooks for network data                           │
│  8. Connect all components with API integration                 │
├─────────────────────────────────────────────────────────────────┤
│ DEPENDENCIES: None (uses existing packages)                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📅 4-Week Timeline Visualization

```
Week 1: FOUNDATION
┌─────────┬─────────┬─────────┬─────────┐
│Member 1 │Member 2 │Member 3 │Member 4 │
├─────────┼─────────┼─────────┼─────────┤
│RelayNode│Database │Dashboard│Event    │
│  class  │ models  │ layout  │  bus    │
│         │         │         │         │
│Relay    │Event    │Component│Packet   │
│ pool    │ logger  │structure│ tracker │
│         │         │         │         │
│Test     │Test     │Basic    │API      │
│ nodes   │ rules   │rendering│skeleton │
└─────────┴─────────┴─────────┴─────────┘
        ✅ Integration Meeting (Friday)

Week 2: CORE FEATURES
┌─────────┬─────────┬─────────┬─────────┐
│Member 1 │Member 2 │Member 3 │Member 4 │
├─────────┼─────────┼─────────┼─────────┤
│Circuit  │Complete │Network  │API      │
│builder  │rule     │graph    │endpoints│
│         │engine   │         │         │
│Onion    │Packet   │Node     │WebSocket│
│encrypt  │inspector│visualiz │  setup  │
│         │         │         │         │
│Routing  │Anomaly  │Relay    │Connect  │
│engine   │detector │status   │  APIs   │
└─────────┴─────────┴─────────┴─────────┘
        ✅ Integration Meeting (Friday)

Week 3: INTEGRATION
┌─────────┬─────────┬─────────┬─────────┐
│Member 1 │Member 2 │Member 3 │Member 4 │
├─────────┼─────────┼─────────┼─────────┤
│Latency  │ML       │Packet   │Full     │
│simulator│anomaly  │animation│ API     │
│         │         │         │         │
│Message  │Action   │IDS      │Real-time│
│control  │handler  │charts   │ events  │
│         │         │         │         │
│Socket   │IDS API  │Alerts   │Packet   │
│events   │endpoints│component│tracking │
└─────────┴─────────┴─────────┴─────────┘
        ✅ Full System Test (Friday)

Week 4: POLISH & DEMO
┌─────────┬─────────┬─────────┬─────────┐
│    ALL MEMBERS: Testing & Refinement   │
├─────────────────────────────────────────┤
│ Mon: Performance optimization           │
│ Tue: Edge cases & bug fixes             │
│ Wed: Documentation                      │
│ Thu: Demo scenario testing              │
│ Fri: FINAL DEMO 🎉                      │
└─────────────────────────────────────────┘
```

---

## 🔄 Integration Points

```
┌──────────────────────────────────────────────────────┐
│            HOW MEMBERS WORK TOGETHER                 │
└──────────────────────────────────────────────────────┘

Member 1 → Member 2
────────────────────────────────
When: Week 2
What: Member 1's relay nodes call Member 2's IDS
File: tor/relayNode.js uses ids/packetInspector.js
Action: Add IDS inspection at each relay

Member 1 → Member 4
────────────────────────────────
When: Week 1-2
What: Member 4 tracks packets created by Member 1
File: packetTracker.js monitors routingEngine.js
Action: Emit events for packet progress

Member 2 → Member 4
────────────────────────────────
When: Week 2-3
What: Member 2 logs events that Member 4 exposes
File: eventLogger.js uses eventBus.js
Action: Log to DB and emit to frontend

Member 4 → Member 3
────────────────────────────────
When: Week 2-3
What: Member 4 provides WebSocket events for Member 3
File: networkSocket.js feeds useNetworkStore.js
Action: Real-time data updates in dashboard
```

---

## 📊 Complexity Breakdown

```
MEMBER 1: ⭐⭐⭐⭐
├─ Encryption Layers:      ⭐⭐⭐⭐⭐ (Hardest)
├─ Circuit Building:       ⭐⭐⭐⭐
├─ Routing Engine:         ⭐⭐⭐
└─ Latency Simulator:      ⭐⭐ (Easiest)

MEMBER 2: ⭐⭐⭐⭐⭐
├─ ML Anomaly Detection:   ⭐⭐⭐⭐⭐ (Hardest)
├─ Rule Engine:            ⭐⭐⭐⭐
├─ Packet Inspector:       ⭐⭐⭐⭐
└─ Event Logger:           ⭐⭐⭐ (Easiest)

MEMBER 3: ⭐⭐⭐⭐
├─ Network Topology:       ⭐⭐⭐⭐⭐ (Hardest)
├─ Packet Animations:      ⭐⭐⭐⭐
├─ IDS Analytics Charts:   ⭐⭐⭐⭐
└─ Component Layouts:      ⭐⭐⭐ (Easiest)

MEMBER 4: ⭐⭐⭐
├─ WebSocket Events:       ⭐⭐⭐⭐ (Hardest)
├─ API Controllers:        ⭐⭐⭐
├─ Packet Tracker:         ⭐⭐⭐
└─ Route Setup:            ⭐⭐ (Easiest)
```

---

## 📈 Workload Distribution

```
Hours per Week:

Week 1:  ████░░░░ (4-6 hours)  - Setup & Foundation
Week 2:  ████████ (8-10 hours) - Core Features
Week 3:  ████████ (8-10 hours) - Integration
Week 4:  ████░░░░ (4-6 hours)  - Polish & Testing

Total: 25-32 hours per member
```

---

## 🎯 Success Metrics by Member

```
MEMBER 1 ✅
├─ Messages route through 3 relay nodes
├─ Each node decrypts one layer
├─ Circuit IDs are tracked
├─ Latency is simulated (50-200ms)
└─ Messages reach correct destination

MEMBER 2 ✅
├─ 8+ detection rules implemented
├─ SQL injection detected & blocked
├─ XSS attempts detected & blocked
├─ Oversized packets flagged
├─ All events logged to database
└─ Statistics API returns accurate data

MEMBER 3 ✅
├─ Network topology displays nodes
├─ Packet flow animation works
├─ IDS charts update in real-time
├─ Relay status shows node health
└─ Dashboard is mobile-responsive

MEMBER 4 ✅
├─ All API endpoints functional
├─ WebSocket events firing correctly
├─ Packet tracker follows journey
├─ Event bus connects components
└─ Frontend receives real-time updates
```

---

## 📞 Daily Workflow

```
🌅 9:00 AM - Daily Standup (10 minutes)
   └─ Share: Yesterday's progress
   └─ Share: Today's plan
   └─ Share: Any blockers

⏰ 9:30 AM - 5:00 PM - Coding Time
   └─ Work on your tasks
   └─ Commit frequently
   └─ Test continuously
   └─ Ask questions in chat

🌆 5:00 PM - End of Day
   └─ Push your code
   └─ Update progress tracker
   └─ Note blockers for tomorrow

🎉 Friday 3:00 PM - Integration Meeting
   └─ Merge tested code to dev
   └─ Integration testing
   └─ Plan next week
```

---

## 🚀 Quick Start Commands

```bash
# Member 1
cd backend
npm install uuid
mkdir -p src/tor
git checkout -b feature/tor-routing

# Member 2
cd backend
npm install brain.js uuid
mkdir -p src/ids src/models
git checkout -b feature/intrusion-detection

# Member 3
cd frontend
npm install reactflow recharts framer-motion
mkdir -p src/pages src/components
git checkout -b feature/visualization-dashboard

# Member 4
git checkout -b feature/integration-api
mkdir -p backend/src/lib frontend/src/lib
```

---

## ✅ Completion Checklist

```
MEMBER 1
├─ [  ] RelayNode class created
├─ [  ] Circuit builder working
├─ [  ] Onion encryption implemented
├─ [  ] Routing engine functional
├─ [  ] Latency simulation added
├─ [  ] Message controller updated
├─ [  ] Socket events integrated
└─ [  ] End-to-end routing tested

MEMBER 2
├─ [  ] Database models created
├─ [  ] Rule engine with 8+ rules
├─ [  ] Packet inspector working
├─ [  ] Anomaly detector implemented
├─ [  ] Action handler functional
├─ [  ] Event logger working
├─ [  ] IDS API endpoints created
└─ [  ] Integration with relay nodes

MEMBER 3
├─ [  ] Dashboard page created
├─ [  ] Network topology displays
├─ [  ] Packet animation works
├─ [  ] IDS analytics charts shown
├─ [  ] Relay status monitors
├─ [  ] Packet inspector table
├─ [  ] Security alerts component
└─ [  ] Real-time updates working

MEMBER 4
├─ [  ] Event bus created
├─ [  ] Packet tracker working
├─ [  ] Network APIs functional
├─ [  ] WebSocket events setup
├─ [  ] Frontend socket connected
├─ [  ] Packet store implemented
├─ [  ] Custom hooks created
└─ [  ] All components connected
```

---

**Ready to start? Check your assignment file and let's build! 🚀**
