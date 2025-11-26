# SchizoChatPlus - Quick Reference Guide

## 📋 Team Assignment Summary

### Team Member 1: Tor Routing System 🛣️
**Complexity:** ⭐⭐⭐⭐ (High)  
**Time:** 25-30 hours  
**Branch:** `feature/tor-routing`

**Core Responsibilities:**
- Build virtual relay network
- Implement multi-layer encryption
- Create circuit building logic
- Add latency simulation

**Main Files:**
```
backend/src/tor/
├── relayNode.js           # Relay node class
├── circuitBuilder.js      # Random path selection
├── encryptionLayer.js     # Onion encryption
├── routingEngine.js       # Message forwarding
├── latencySimulator.js    # Network delays
└── torConfig.js           # Configuration
```

**Setup:**
```bash
cd backend
npm install uuid
mkdir -p src/tor
git checkout -b feature/tor-routing
```

---

### Team Member 2: Intrusion Detection System 🛡️
**Complexity:** ⭐⭐⭐⭐⭐ (Very High)  
**Time:** 28-32 hours  
**Branch:** `feature/intrusion-detection`

**Core Responsibilities:**
- Build packet inspection system
- Create detection rules engine
- Implement AI-based anomaly detection
- Log security events

**Main Files:**
```
backend/src/ids/
├── packetInspector.js     # Analyze packets
├── ruleEngine.js          # Detection rules
├── anomalyDetector.js     # ML detection
├── actionHandler.js       # Block/flag logic
└── eventLogger.js         # Event logging

backend/src/models/
├── packetLog.model.js
└── idsEvent.model.js
```

**Setup:**
```bash
cd backend
npm install brain.js uuid
mkdir -p src/ids src/models
git checkout -b feature/intrusion-detection
```

---

### Team Member 3: Visualization Dashboard 📊
**Complexity:** ⭐⭐⭐⭐ (High)  
**Time:** 26-30 hours  
**Branch:** `feature/visualization-dashboard`

**Core Responsibilities:**
- Build network topology view
- Create packet flow animations
- Design IDS analytics dashboard
- Show relay node status

**Main Files:**
```
frontend/src/
├── pages/
│   └── NetworkVisualizationPage.jsx
├── components/
│   ├── NetworkTopology.jsx
│   ├── PacketFlowAnimation.jsx
│   ├── IDSAnalytics.jsx
│   ├── RelayStatus.jsx
│   ├── PacketInspector.jsx
│   └── SecurityAlerts.jsx
└── store/
    └── useNetworkStore.js
```

**Setup:**
```bash
cd frontend
npm install reactflow recharts framer-motion
mkdir -p src/pages src/components
git checkout -b feature/visualization-dashboard
```

---

### Team Member 4: Integration & API 🔗
**Complexity:** ⭐⭐⭐ (Medium)  
**Time:** 22-26 hours  
**Branch:** `feature/integration-api`

**Core Responsibilities:**
- Create unified network APIs
- Build event bus system
- Track packet journeys
- Connect frontend to backend

**Main Files:**
```
backend/src/
├── controllers/network.controller.js
├── routes/network.route.js
└── lib/
    ├── eventBus.js
    └── packetTracker.js

frontend/src/
├── lib/networkSocket.js
├── store/usePacketStore.js
└── hooks/useNetworkData.js
```

**Setup:**
```bash
git checkout -b feature/integration-api
# No additional npm packages needed
```

---

## 🎯 4-Week Timeline

### Week 1: Foundation
| Member | Tasks |
|--------|-------|
| 1 | Basic relay nodes + encryption setup |
| 2 | IDS framework + database models |
| 3 | Dashboard layout + component structure |
| 4 | Event bus + API skeleton |

### Week 2: Core Features
| Member | Tasks |
|--------|-------|
| 1 | Circuit building + onion encryption |
| 2 | Detection rules + packet inspection |
| 3 | Network graph visualization |
| 4 | API endpoints + WebSocket events |

### Week 3: Integration
| Member | Tasks |
|--------|-------|
| 1 | Full routing flow + latency |
| 2 | Anomaly detection + logging |
| 3 | Packet animations + charts |
| 4 | Connect all components + testing |

### Week 4: Polish
| All | System testing, bug fixes, documentation, demo prep |

---

## 🔄 Daily Workflow

1. **Pull latest changes**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout your-branch
   git merge dev
   ```

2. **Work on your tasks**
   - Write code
   - Test locally
   - Commit frequently

3. **Push your work**
   ```bash
   git add .
   git commit -m "feat: descriptive message"
   git push origin your-branch
   ```

4. **Create PR when feature is complete**

---

## 📊 Task Complexity Breakdown

### Member 1: Tor Routing
- ⭐⭐⭐⭐⭐ Encryption layers (hardest)
- ⭐⭐⭐⭐ Circuit building
- ⭐⭐⭐ Routing engine
- ⭐⭐ Latency simulator (easiest)

### Member 2: IDS
- ⭐⭐⭐⭐⭐ Anomaly detection with ML (hardest)
- ⭐⭐⭐⭐ Rule engine
- ⭐⭐⭐⭐ Packet inspector
- ⭐⭐⭐ Event logger (easiest)

### Member 3: Visualization
- ⭐⭐⭐⭐⭐ Network topology with react-flow (hardest)
- ⭐⭐⭐⭐ Packet flow animations
- ⭐⭐⭐⭐ IDS analytics charts
- ⭐⭐⭐ Component layouts (easiest)

### Member 4: Integration
- ⭐⭐⭐⭐ WebSocket event system (hardest)
- ⭐⭐⭐ API controllers
- ⭐⭐⭐ Packet tracker
- ⭐⭐ Route setup (easiest)

---

## 🚀 Quick Start

### First Time Setup (Everyone)
```bash
# Clone repo
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Create Your Branch
```bash
# From root directory
git checkout -b feature/your-feature-name
```

### Start Development Server
```bash
# From root directory (runs both frontend & backend)
npm run dev
```

---

## 📂 Key File Locations

### Backend Structure
```
backend/src/
├── tor/              # Member 1
├── ids/              # Member 2
├── controllers/
│   ├── message.controller.js  # Member 1 modifies
│   ├── ids.controller.js      # Member 2
│   └── network.controller.js  # Member 4
├── routes/
│   ├── ids.route.js           # Member 2
│   └── network.route.js       # Member 4
├── models/
│   ├── packetLog.model.js     # Member 2
│   └── idsEvent.model.js      # Member 2
└── lib/
    ├── socket.js              # Member 1 & 4 modify
    ├── eventBus.js            # Member 4
    └── packetTracker.js       # Member 4
```

### Frontend Structure
```
frontend/src/
├── pages/
│   └── NetworkVisualizationPage.jsx  # Member 3
├── components/
│   ├── NetworkTopology.jsx           # Member 3
│   ├── PacketFlowAnimation.jsx       # Member 3
│   ├── IDSAnalytics.jsx              # Member 3
│   └── ...                           # Member 3
├── store/
│   ├── useNetworkStore.js            # Member 3
│   └── usePacketStore.js             # Member 4
├── lib/
│   └── networkSocket.js              # Member 4
└── hooks/
    └── useNetworkData.js             # Member 4
```

---

## 🔧 Dependencies by Member

### Member 1
```bash
cd backend
npm install uuid
```

### Member 2
```bash
cd backend
npm install brain.js uuid  # or ml-regression
```

### Member 3
```bash
cd frontend
npm install reactflow recharts framer-motion
```

### Member 4
No additional dependencies (uses existing)

---

## 🤝 Integration Points

### Member 1 → Member 2
Member 1's relay nodes call Member 2's IDS to inspect packets

### Member 1 → Member 4
Member 4 tracks packets created by Member 1's routing

### Member 2 → Member 4
Member 2 logs events that Member 4 exposes via API

### Member 4 → Member 3
Member 4 provides WebSocket events for Member 3's visualizations

---

## 📞 Communication

### Daily Standup (10am)
- 5 minutes per person
- Share progress & blockers

### Weekly Integration (Friday 2pm)
- Merge branches to `dev`
- Test integrated system
- Plan next week

### Code Review
- All PRs need 1 approval
- Review within 24 hours
- Be constructive

---

## ✅ Definition of Done

A task is complete when:
- [ ] Code is written and works locally
- [ ] No console errors
- [ ] Tested with sample data
- [ ] Committed with clear message
- [ ] Pushed to your branch
- [ ] PR created (for major features)
- [ ] Code reviewed by peer

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Git conflicts:**
```bash
# Update your branch with latest dev
git checkout dev
git pull origin dev
git checkout your-branch
git merge dev
# Resolve conflicts, then:
git add .
git commit -m "merge: resolve conflicts"
```

---

## 📚 Key Resources

### Documentation
- Node.js Crypto: https://nodejs.org/api/crypto.html
- Socket.io: https://socket.io/docs/
- React Flow: https://reactflow.dev/
- Recharts: https://recharts.org/
- Brain.js: https://brain.js.org/

### Example Code
See `TEAM_WORK_DISTRIBUTION.md` for detailed examples

---

## 🎯 Success Metrics

### What Good Looks Like

**Member 1:** Messages successfully route through 3 relay nodes with encryption

**Member 2:** IDS blocks malicious packets and logs all events

**Member 3:** Dashboard shows real-time network activity with smooth animations

**Member 4:** All components communicate seamlessly via APIs and WebSockets

---

## 📋 Checklist Template

Copy this for each week:

```markdown
## Week [X] - [Your Name]

### Monday
- [ ] Task 1
- [ ] Task 2

### Tuesday
- [ ] Task 3
- [ ] Task 4

### Wednesday
- [ ] Task 5
- [ ] Integration testing

### Thursday
- [ ] Bug fixes
- [ ] Code review

### Friday
- [ ] Merge to dev
- [ ] Team sync

### Blockers
- None / [List any issues]

### Notes
[Any important observations]
```

---

## 🎓 Learning Path

### Week 1: Learn
- Read documentation
- Understand architecture
- Set up environment

### Week 2: Build
- Implement core features
- Test individually
- Ask questions

### Week 3: Integrate
- Connect with team
- Fix integration issues
- End-to-end testing

### Week 4: Polish
- Refine UI/UX
- Performance optimize
- Prepare demo

---

**Remember:** This is an educational project. Focus on learning and demonstrating concepts, not production-ready code. Have fun! 🚀
