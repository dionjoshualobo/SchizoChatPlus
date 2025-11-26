# 📊 SchizoChatPlus - Project Summary

## 🎯 Quick Overview

**Project:** Tor-Simulated Network with Intrusion Detection System  
**Goal:** Educational demonstration of onion routing and network security  
**Team:** 4 Members  
**Timeline:** 4 Weeks  
**Repository:** https://github.com/dionjoshualobo/SchizoChatPlus/

---

## 📚 Documentation Files

We've created several documents to guide your team:

1. **TEAM_WORK_DISTRIBUTION.md** - Complete detailed guide (60+ pages) with all member assignments
2. **QUICK_REFERENCE.md** - Quick lookup guide
3. **WORK_DISTRIBUTION_VISUAL.md** - Visual summary of tasks and timeline
4. This file - Summary overview

---

## 👥 Team Roles & Complexity

| Member | Role | Files to Create | Complexity | Hours |
|--------|------|----------------|------------|-------|
| **1** | Tor Routing Engineer | 6 new files, 2 modifications | ⭐⭐⭐⭐ | 25-30 |
| **2** | IDS Engineer | 10 new files, 1 modification | ⭐⭐⭐⭐⭐ | 28-32 |
| **3** | Visualization Developer | 9 new files, 2 modifications | ⭐⭐⭐⭐ | 26-30 |
| **4** | Integration Engineer | 8 new files, 4 modifications | ⭐⭐⭐ | 22-26 |

**Total:** 101-118 hours (~25-30 hours per person)

---

## 🗂️ File Distribution

### Member 1: Tor Routing System
```
backend/src/tor/
├── relayNode.js           ✅ Create
├── circuitBuilder.js      ✅ Create
├── encryptionLayer.js     ✅ Create
├── routingEngine.js       ✅ Create
├── latencySimulator.js    ✅ Create
└── torConfig.js           ✅ Create

Modified:
├── controllers/message.controller.js  ✏️ Modify
└── lib/socket.js                      ✏️ Modify
```

### Member 2: Intrusion Detection System
```
backend/src/ids/
├── packetInspector.js     ✅ Create
├── ruleEngine.js          ✅ Create
├── anomalyDetector.js     ✅ Create
├── actionHandler.js       ✅ Create
├── eventLogger.js         ✅ Create
└── idsConfig.js           ✅ Create

backend/src/models/
├── packetLog.model.js     ✅ Create
└── idsEvent.model.js      ✅ Create

backend/src/routes/
└── ids.route.js           ✅ Create

backend/src/controllers/
└── ids.controller.js      ✅ Create

Modified:
└── tor/relayNode.js       ✏️ Modify (with Member 1)
```

### Member 3: Visualization Dashboard
```
frontend/src/pages/
└── NetworkVisualizationPage.jsx  ✅ Create

frontend/src/components/
├── NetworkTopology.jsx           ✅ Create
├── PacketFlowAnimation.jsx       ✅ Create
├── IDSAnalytics.jsx              ✅ Create
├── RelayStatus.jsx               ✅ Create
├── PacketInspector.jsx           ✅ Create
├── SecurityAlerts.jsx            ✅ Create
├── RelayNodeCard.jsx             ✅ Create
└── MessagePathTracer.jsx         ✅ Create

frontend/src/store/
└── useNetworkStore.js            ✅ Create

Modified:
├── App.jsx                       ✏️ Modify
└── components/Navbar.jsx         ✏️ Modify
```

### Member 4: Integration & API
```
backend/src/lib/
├── eventBus.js            ✅ Create
└── packetTracker.js       ✅ Create

backend/src/controllers/
└── network.controller.js  ✅ Create

backend/src/routes/
└── network.route.js       ✅ Create

backend/src/services/
└── networkService.js      ✅ Create

frontend/src/lib/
└── networkSocket.js       ✅ Create

frontend/src/store/
└── usePacketStore.js      ✅ Create

frontend/src/hooks/
└── useNetworkData.js      ✅ Create

Modified:
├── backend/src/index.js           ✏️ Modify
├── backend/src/lib/socket.js      ✏️ Modify
├── frontend/src/App.jsx           ✏️ Modify
└── frontend/src/components/Navbar.jsx  ✏️ Modify
```

---

## 📦 Dependencies to Install

### Member 1 (Tor Routing)
```bash
cd backend
npm install uuid
```

### Member 2 (IDS)
```bash
cd backend
npm install brain.js uuid
# OR: npm install ml-regression uuid
```

### Member 3 (Visualization)
```bash
cd frontend
npm install reactflow recharts framer-motion
```

### Member 4 (Integration)
```bash
# No additional dependencies
```

---

## 🚀 Quick Start Guide

### Day 1: Setup

**Everyone:**
```bash
# Clone repository
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Create your branch
git checkout -b feature/your-feature-name
```

**Member 1:**
```bash
cd backend
npm install uuid
mkdir -p src/tor
touch src/tor/{relayNode,circuitBuilder,encryptionLayer,routingEngine,latencySimulator,torConfig}.js
```

**Member 2:**
```bash
cd backend
npm install brain.js uuid
mkdir -p src/ids src/models
touch src/ids/{packetInspector,ruleEngine,anomalyDetector,actionHandler,eventLogger,idsConfig}.js
touch src/models/{packetLog,idsEvent}.model.js
touch src/routes/ids.route.js
touch src/controllers/ids.controller.js
```

**Member 3:**
```bash
cd frontend
npm install reactflow recharts framer-motion
mkdir -p src/pages src/components
touch src/pages/NetworkVisualizationPage.jsx
touch src/components/{NetworkTopology,PacketFlowAnimation,IDSAnalytics,RelayStatus,PacketInspector,SecurityAlerts,RelayNodeCard,MessagePathTracer}.jsx
touch src/store/useNetworkStore.js
```

**Member 4:**
```bash
mkdir -p backend/src/lib backend/src/controllers backend/src/routes
touch backend/src/lib/{eventBus,packetTracker}.js
touch backend/src/controllers/network.controller.js
touch backend/src/routes/network.route.js
mkdir -p frontend/src/lib frontend/src/store frontend/src/hooks
touch frontend/src/lib/networkSocket.js
touch frontend/src/store/usePacketStore.js
touch frontend/src/hooks/useNetworkData.js
```

---

## 📅 4-Week Timeline

### Week 1: Foundation & Setup
**Goal:** Get infrastructure in place

| Day | Member 1 | Member 2 | Member 3 | Member 4 |
|-----|----------|----------|----------|----------|
| Mon | Setup + RelayNode class | Setup + Database models | Setup + Dashboard layout | Setup + Event bus |
| Tue | Continue RelayNode | Event logger | Component structure | Packet tracker |
| Wed | Relay pool initialization | Rule engine skeleton | Network topology research | API skeleton |
| Thu | Test relay nodes | Test rules | Basic component rendering | Event emissions |
| Fri | Integration prep | Integration prep | Integration prep | **Team sync & merge** |

**Deliverables:**
- ✅ Member 1: Basic relay nodes working
- ✅ Member 2: Database models + event logger
- ✅ Member 3: Dashboard skeleton rendered
- ✅ Member 4: Event bus + API structure

---

### Week 2: Core Features
**Goal:** Implement main functionality

| Day | Member 1 | Member 2 | Member 3 | Member 4 |
|-----|----------|----------|----------|----------|
| Mon | Circuit builder | Complete rule engine | Network graph with react-flow | API controllers |
| Tue | Encryption layer (start) | Packet inspector | Node visualization | WebSocket setup |
| Wed | Encryption layer (complete) | Test detection rules | Relay status cards | Connect APIs |
| Thu | Routing engine | Anomaly detector (statistical) | Packet inspector component | Test WebSocket events |
| Fri | Test routing flow | Test IDS inspection | Test visualizations | **Team sync & integration** |

**Deliverables:**
- ✅ Member 1: Circuit building + encryption working
- ✅ Member 2: Rules detecting threats
- ✅ Member 3: Network graph displaying
- ✅ Member 4: APIs returning data

---

### Week 3: Integration & Enhancement
**Goal:** Connect all components

| Day | Member 1 | Member 2 | Member 3 | Member 4 |
|-----|----------|----------|----------|----------|
| Mon | Latency simulator | Anomaly detector (ML) | Packet flow animation | Full API integration |
| Tue | Message controller update | Action handler | IDS analytics charts | Real-time events |
| Wed | Socket events | IDS API endpoints | Security alerts component | Packet tracking |
| Thu | Integration testing | Integration with relays | Real-time data updates | End-to-end testing |
| Fri | Bug fixes | Bug fixes | Bug fixes | **Full system test** |

**Deliverables:**
- ✅ Member 1: Messages route through Tor
- ✅ Member 2: IDS blocks malicious packets
- ✅ Member 3: Live visualization working
- ✅ Member 4: All components connected

---

### Week 4: Polish & Testing
**Goal:** Refinement and demo preparation

| Day | Member 1 | Member 2 | Member 3 | Member 4 |
|-----|----------|----------|----------|----------|
| Mon | Performance optimization | Fine-tune detection rules | UI/UX improvements | Performance testing |
| Tue | Edge case handling | Add custom rules | Animation smoothness | Load testing |
| Wed | Documentation | Documentation | Documentation | Documentation |
| Thu | Demo scenario testing | Demo scenario testing | Demo scenario testing | Demo scenario testing |
| Fri | **Final demo preparation & presentation** | | | |

**Deliverables:**
- ✅ Complete working system
- ✅ Documentation
- ✅ Demo ready
- ✅ Presentation prepared

---

## 🔄 Daily Workflow

### Morning (9:00 AM)
- Pull latest changes from `dev` branch
- Daily standup (10 minutes)
- Review today's tasks

### Work Time (9:30 AM - 5:00 PM)
- Code your assigned tasks
- Commit frequently with clear messages
- Test your work continuously
- Ask questions in team chat

### End of Day (5:00 PM)
- Push your work to your branch
- Update progress in team doc
- Note any blockers for tomorrow

### Friday Afternoon (3:00 PM)
- Create PR for your week's work
- Team integration session
- Merge to `dev` branch
- Plan next week

---

## ✅ Definition of Done Checklist

A feature is complete when:

- [ ] Code is written and follows project structure
- [ ] Code is tested locally and works
- [ ] No console errors or warnings
- [ ] Committed with clear, descriptive message
- [ ] Pushed to your feature branch
- [ ] Documentation updated (if needed)
- [ ] Code reviewed by peer (for major features)
- [ ] Integrated with other components (if applicable)
- [ ] Merged to `dev` branch

---

## 🎯 Success Metrics

### Member 1: Tor Routing ✅
- [ ] Messages successfully route through 3 relay nodes
- [ ] Each node decrypts one encryption layer
- [ ] Messages reach correct destination
- [ ] Circuit IDs are tracked
- [ ] Latency is simulated (50-200ms per hop)

### Member 2: IDS ✅
- [ ] At least 8 detection rules implemented
- [ ] SQL injection detected and blocked
- [ ] XSS attempts detected and blocked
- [ ] Oversized packets flagged
- [ ] All events logged to database
- [ ] Statistics API returns accurate data

### Member 3: Visualization ✅
- [ ] Network topology displays all relay nodes
- [ ] Packet flow animation shows message journey
- [ ] IDS analytics charts update in real-time
- [ ] Relay status indicators show node health
- [ ] Dashboard is responsive on mobile

### Member 4: Integration ✅
- [ ] All API endpoints working
- [ ] WebSocket events firing correctly
- [ ] Packet tracker follows message journey
- [ ] Event bus connects all components
- [ ] Frontend receives real-time updates

---

## 📞 Communication Guidelines

### Daily Standup Format
```
Name: [Your Name]
Date: [Date]

✅ Completed Yesterday:
- Task 1
- Task 2

🚀 Today's Goals:
- Task 3
- Task 4

🚧 Blockers:
- None / [Describe issue]
```

### Git Commit Message Format
```
type: brief description

- Detail 1
- Detail 2

Examples:
feat: add relay node encryption layer
fix: resolve circuit building bug
docs: update API documentation
test: add unit tests for rule engine
```

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Functions have clear names
- [ ] Complex logic is commented
- [ ] No hardcoded values
- [ ] Error handling is present
- [ ] Code is tested

---

## 🐛 Common Issues & Solutions

### Issue: Port already in use
```bash
# Solution
lsof -ti:5001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Issue: Module not found
```bash
# Solution
cd backend  # or frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Git merge conflicts
```bash
# Solution
git checkout dev
git pull origin dev
git checkout your-branch
git merge dev
# Resolve conflicts in VS Code
git add .
git commit -m "merge: resolve conflicts with dev"
```

### Issue: MongoDB connection error
```bash
# Check .env file has correct MONGODB_URI
# Make sure MongoDB is running
```

### Issue: Socket.io not connecting
```bash
# Check CORS settings in backend/src/lib/socket.js
# Verify frontend URL matches
# Check firewall settings
```

---

## 📚 Learning Resources

### For Everyone
- Git & GitHub: https://learngitbranching.js.org/
- JavaScript ES6+: https://javascript.info/
- Async/Await: https://javascript.info/async-await

### Member 1
- Node.js Crypto: https://nodejs.org/api/crypto.html
- RSA Encryption: https://en.wikipedia.org/wiki/RSA_(cryptosystem)
- Tor Protocol: https://www.torproject.org/

### Member 2
- Brain.js: https://brain.js.org/
- IDS Concepts: https://www.sans.org/reading-room/whitepapers/detection/
- OWASP: https://owasp.org/www-project-top-ten/

### Member 3
- React Flow: https://reactflow.dev/
- Recharts: https://recharts.org/
- Framer Motion: https://www.framer.com/motion/

### Member 4
- Socket.io: https://socket.io/docs/
- REST API Design: https://restfulapi.net/
- Event-Driven: https://martinfowler.com/articles/201701-event-driven.html

---

## 🎓 Educational Outcomes

By completing this project, your team will learn:

1. **Network Concepts:**
   - Onion routing and layered encryption
   - Circuit-based routing
   - Network latency and packet flow
   - Relay node architecture

2. **Security Concepts:**
   - Intrusion detection systems
   - Packet inspection and analysis
   - Threat detection rules
   - Anomaly detection (statistical & ML)

3. **Software Engineering:**
   - Modular architecture
   - Team collaboration with Git
   - API design and integration
   - Real-time communication with WebSockets

4. **Full-Stack Development:**
   - Node.js backend development
   - React frontend development
   - Database design (MongoDB)
   - State management (Zustand)

---

## 🏆 Final Deliverables

### Code
- [ ] Complete source code in GitHub repo
- [ ] All features implemented and working
- [ ] Code is clean and documented

### Documentation
- [ ] README.md updated with project description
- [ ] API documentation
- [ ] Setup instructions
- [ ] Architecture diagrams

### Demo
- [ ] Live demonstration of Tor routing
- [ ] IDS blocking malicious packets
- [ ] Real-time visualization
- [ ] Q&A preparation

### Presentation
- [ ] Architecture overview slides
- [ ] Each member presents their component
- [ ] Demo video (backup)
- [ ] Technical challenges overcome

---

## 📊 Project Statistics Target

By project completion, you should have:

- **Total Files Created:** ~33 new files
- **Lines of Code:** ~3,000-4,000 lines
- **Git Commits:** ~100-150 commits
- **Pull Requests:** ~12-16 PRs
- **Features:** 4 major components integrated

---

## 🎉 Celebration Milestones

- **Week 1 Complete:** First successful relay node created! 🎊
- **Week 2 Complete:** First packet blocked by IDS! 🛡️
- **Week 3 Complete:** Live visualization working! 📊
- **Week 4 Complete:** Full system demo ready! 🚀

---

## 📁 Where to Find Everything

1. **TEAM_WORK_DISTRIBUTION.md** → Full detailed guide (60+ pages) with all member assignments
2. **QUICK_REFERENCE.md** → Quick lookup for commands and structure
3. **WORK_DISTRIBUTION_VISUAL.md** → Visual summary and checklists
4. **ARCHITECTURE.md** → System architecture and diagrams

---

## 🚀 Next Steps

1. **Read this summary** to understand the big picture
2. **Read TEAM_WORK_DISTRIBUTION.md** (your member section)
3. **Set up your environment** (Day 1 setup commands above)
4. **Create your feature branch**
5. **Start coding!**

---

**Remember:** This is an educational project. Focus on learning, collaboration, and demonstrating concepts. Have fun building! 🎓🚀

**Questions?** Create an issue in the GitHub repo or contact your team lead.

**Good luck, team! Let's build something amazing! 💪**
