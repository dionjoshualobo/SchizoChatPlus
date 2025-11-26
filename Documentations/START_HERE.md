# 🎯 START HERE - Team Quick Start Guide

**Welcome to SchizoChatPlus Development Team!**

This document will get you started in 5 minutes.

---

## 📋 Step 1: Read Your Assignment (5 minutes)

Find your member number and read the corresponding section in TEAM_WORK_DISTRIBUTION.md:

| You Are | Read This Section | Complexity | Hours |
|---------|------------------|------------|-------|
| **Member 1** | [TEAM_WORK_DISTRIBUTION.md - Member 1](TEAM_WORK_DISTRIBUTION.md#team-member-1-tor-routing-engineer) | ⭐⭐⭐⭐ | 25-30 |
| **Member 2** | [TEAM_WORK_DISTRIBUTION.md - Member 2](TEAM_WORK_DISTRIBUTION.md#team-member-2-intrusion-detection-system-ids-engineer) | ⭐⭐⭐⭐⭐ | 28-32 |
| **Member 3** | [TEAM_WORK_DISTRIBUTION.md - Member 3](TEAM_WORK_DISTRIBUTION.md#team-member-3-visualization-dashboard-developer) | ⭐⭐⭐⭐ | 26-30 |
| **Member 4** | [TEAM_WORK_DISTRIBUTION.md - Member 4](TEAM_WORK_DISTRIBUTION.md#team-member-4-integration--api-engineer) | ⭐⭐⭐ | 22-26 |

---

## 💻 Step 2: Setup Your Environment (10 minutes)

### Everyone Does This:

```bash
# 1. Clone the repository
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus

# 2. Install root dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Install frontend dependencies
cd ../frontend
npm install
cd ..

# 5. Create your feature branch
git checkout -b feature/your-name-feature
```

### Then, Based on Your Role:

**Member 1 (Tor Routing):**
```bash
cd backend
npm install uuid
mkdir -p src/tor
touch src/tor/relayNode.js
touch src/tor/circuitBuilder.js
touch src/tor/encryptionLayer.js
touch src/tor/routingEngine.js
touch src/tor/latencySimulator.js
touch src/tor/torConfig.js
```

**Member 2 (IDS):**
```bash
cd backend
npm install brain.js uuid
mkdir -p src/ids src/models
touch src/ids/packetInspector.js
touch src/ids/ruleEngine.js
touch src/ids/anomalyDetector.js
touch src/ids/actionHandler.js
touch src/ids/eventLogger.js
touch src/ids/idsConfig.js
touch src/models/packetLog.model.js
touch src/models/idsEvent.model.js
touch src/routes/ids.route.js
touch src/controllers/ids.controller.js
```

**Member 3 (Visualization):**
```bash
cd frontend
npm install reactflow recharts framer-motion
mkdir -p src/pages src/components
touch src/pages/NetworkVisualizationPage.jsx
touch src/components/NetworkTopology.jsx
touch src/components/PacketFlowAnimation.jsx
touch src/components/IDSAnalytics.jsx
touch src/components/RelayStatus.jsx
touch src/components/PacketInspector.jsx
touch src/components/SecurityAlerts.jsx
touch src/store/useNetworkStore.js
```

**Member 4 (Integration):**
```bash
# Backend files
mkdir -p backend/src/lib backend/src/controllers backend/src/routes
touch backend/src/lib/eventBus.js
touch backend/src/lib/packetTracker.js
touch backend/src/controllers/network.controller.js
touch backend/src/routes/network.route.js

# Frontend files
mkdir -p frontend/src/lib frontend/src/store frontend/src/hooks
touch frontend/src/lib/networkSocket.js
touch frontend/src/store/usePacketStore.js
touch frontend/src/hooks/useNetworkData.js
```

---

## 📅 Step 3: Check Your Week 1 Tasks

### Member 1 - Week 1 Tasks:
- [ ] Create RelayNode class with encryption keys
- [ ] Initialize relay pool (2 Entry, 3 Middle, 2 Exit nodes)
- [ ] Test individual node creation
- [ ] Document your progress

**Priority:** Start with `relayNode.js` and `torConfig.js`

### Member 2 - Week 1 Tasks:
- [ ] Create database models (PacketLog, IDSEvent)
- [ ] Build event logger
- [ ] Create rule engine skeleton
- [ ] Test database connections

**Priority:** Start with database models first

### Member 3 - Week 1 Tasks:
- [ ] Create dashboard page layout
- [ ] Set up component structure
- [ ] Install and test react-flow
- [ ] Create basic network store

**Priority:** Start with page layout and store

### Member 4 - Week 1 Tasks:
- [ ] Create event bus system
- [ ] Build packet tracker skeleton
- [ ] Set up API route structure
- [ ] Test event emission

**Priority:** Start with event bus

---

## 🚀 Step 4: Start Coding!

### Open Your Editor
```bash
code .  # If using VS Code
```

### Find Your Files
- Member 1: `backend/src/tor/`
- Member 2: `backend/src/ids/` and `backend/src/models/`
- Member 3: `frontend/src/pages/` and `frontend/src/components/`
- Member 4: `backend/src/lib/` and `frontend/src/lib/`

### Start with Task 1
Each assignment file has tasks numbered by priority. Start with Task 1!

---

## 💬 Step 5: Daily Communication

### Every Morning (9:00 AM):
Post in team chat:
```
📅 [Your Name] - [Date]
✅ Yesterday: [What you completed]
🚀 Today: [What you'll work on]
🚧 Blockers: [Any issues or none]
```

### Every Evening (5:00 PM):
- Commit your work: `git add . && git commit -m "feat: description"`
- Push to your branch: `git push origin your-branch`
- Update team on progress

### Friday (3:00 PM):
- Team integration meeting
- Merge tested code to `dev` branch
- Plan next week

---

## 🔧 Quick Commands Reference

### Run the App
```bash
# From root directory
npm run dev          # Runs both frontend and backend
npm run dev:backend  # Backend only
npm run dev:frontend # Frontend only
```

### Git Commands
```bash
# Save your work
git add .
git commit -m "feat: your change description"
git push origin your-branch

# Get latest changes
git checkout dev
git pull origin dev
git checkout your-branch
git merge dev

# Create PR
# Go to GitHub and click "New Pull Request"
```

### If Something Breaks
```bash
# Port already in use
lsof -ti:5001 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Module not found
rm -rf node_modules package-lock.json
npm install

# Reset to clean state
git stash  # Save your changes
git checkout main
git pull origin main
git stash pop  # Restore your changes
```

---

## 📊 Progress Tracking

### Week 1 Checklist (Everyone)
- [ ] Environment set up
- [ ] Branch created
- [ ] Files created
- [ ] First task started
- [ ] First commit made
- [ ] Team sync attended

### Week 2-4 Checklist
- [ ] All tasks in your assignment completed
- [ ] Code tested locally
- [ ] Integration with other components done
- [ ] PR created and reviewed
- [ ] Merged to dev branch

---

## 🆘 Need Help?

### Check These First:
1. TEAM_WORK_DISTRIBUTION.md (your member section)
2. QUICK_REFERENCE.md for commands
3. ARCHITECTURE.md for system design

### Still Stuck?
1. Ask in team chat
2. Schedule pair programming with teammate
3. Create a GitHub issue
4. Ask during daily standup

---

## 🎯 Your First Day Goals

### Member 1:
- [ ] Create RelayNode class
- [ ] Generate RSA key pairs
- [ ] Test node creation
- [ ] Commit: "feat: add relay node class with encryption"

### Member 2:
- [ ] Create PacketLog model
- [ ] Create IDSEvent model
- [ ] Test database connection
- [ ] Commit: "feat: add IDS database models"

### Member 3:
- [ ] Create NetworkVisualizationPage
- [ ] Set up basic layout
- [ ] Install react-flow
- [ ] Commit: "feat: add network visualization page layout"

### Member 4:
- [ ] Create EventBus class
- [ ] Test event emission
- [ ] Create PacketTracker skeleton
- [ ] Commit: "feat: add event bus and packet tracker"

---

## ✅ Before You Start Coding Checklist

- [ ] I've read my assignment file
- [ ] I understand my role
- [ ] Environment is set up
- [ ] Dependencies are installed
- [ ] Branch is created
- [ ] I know my Week 1 tasks
- [ ] I have the team's contact info
- [ ] I'm ready to code! 🚀

---

## 📞 Team Contacts

**Team Lead:** [Name]  
**Member 1 (Tor):** [Name] - [Contact]  
**Member 2 (IDS):** [Name] - [Contact]  
**Member 3 (Viz):** [Name] - [Contact]  
**Member 4 (Integration):** [Name] - [Contact]

**Team Chat:** [Discord/Slack link]  
**Meeting Times:** Mon/Wed/Fri 10am, Friday 3pm integration

---

## 🎉 Ready to Start!

1. ✅ Read your assignment
2. ✅ Set up environment
3. ✅ Create your branch
4. ✅ Open your editor
5. ✅ Start Task 1
6. ✅ Have fun coding!

**Remember:** We're building an educational project. Focus on learning, collaborating, and demonstrating concepts. Don't stress about perfection!

---

**Questions?** Check the documentation or ask in team chat!

**Let's build something amazing! 🚀**
