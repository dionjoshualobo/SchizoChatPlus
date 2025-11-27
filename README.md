# SchizoChat 💬🌀

## Description
**SchizoChat** is a dynamic and experimental chat application designed to foster creativity and free-flowing conversations. Built with modern web technologies, it allows users to engage in real-time chats while exploring an imaginative and unconventional interface.

---

## Tor Node Simulation & Visualization (2025 Update)

This project now includes a simulated Tor network for educational purposes:
- **Simulated Tor Nodes:** Entry, middle, exit, guard, and bridge nodes are created every time the backend starts.
- **Node Data Endpoint:**
  - `GET /tornodes` (on backend, e.g. `http://localhost:5001/tornodes`) returns the current simulated nodes as JSON.
- **Visualization:**
  - `GET /tornodes/visualization` (on backend, e.g. `http://localhost:5001/tornodes/visualization`) displays a live SVG diagram of the Tor network nodes and their connections.
- **No Impact on Chat:**
  - The Tor simulation is isolated and does not affect chat functionality.
- **Graceful Shutdown:**
  - Stopping the backend server also stops the Python Tor simulation process.

---

## Features
- **Instant Messaging:** Experience seamless, real-time messaging with friends or strangers.
- **Creative Themes:** Unique visual themes inspired by surreal and abstract designs.
- **Anonymity Mode:** Engage in discussions without revealing personal information.

## Technologies Used
- Frontend: HTML, CSS, React.js
- Backend: Node.js
- Database: MongoDB
- Hosting: Render

## Working
- https://drive.google.com/file/d/1nOM6DgsTTv3_5ayOd6cQXawWQHgEWN5g/view?usp=drivesdk


## Live Demo
Check out the live version here:
- https://schizo-vuhd.onrender.com/signup

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PlatypusPus/Tech-Winter-Break-app
   ```
2. Navigate to the project directory:
   ```bash
   cd Tech-Winter-Break-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Contributing
We welcome contributions! To get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature: description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.



Let's chat the Schizo way!

