# SchizoChatPlus

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)

SchizoChatPlus is a cutting-edge chat application designed with a strong focus on anonymity, privacy, and security. By leveraging a Tor-like network for message routing, it ensures that user identities and communication remain secure and untraceable. This application is ideal for individuals and organizations that prioritize confidentiality in their communications.

> **Status:** SchizoChatPlus is currently not hosted anywhere publicly. Run both the backend and frontend locally to explore the project.

---

## How It Works

SchizoChatPlus combines client-side obfuscation, layered encryption, and backend intrusion-detection logic to mimic a Tor-style onion-routing experience inside a single application stack. The flow below summarizes what happens after a user types a message:

### Message Flow Overview

1. **Client-side preparation** (`frontend/src`): The React client derives a temporary session key, chunks the outbound payload, and tags it with metadata used for multi-hop routing simulation.
2. **Layered encryption** (`backend/src/lib/utils.js`): Each chunk is wrapped with AES-256 keys associated with the configured “virtual relays,” producing multiple ciphertext layers.
3. **Virtual relay routing** (`backend/src/ids/packetInspector.js`): Packets traverse an in-app relay chain. Every hop peels a single layer, rewrites addressing information, and forwards the packet without ever seeing both the sender and the final recipient.
4. **Rule & anomaly inspection** (`backend/src/ids/ruleEngine.js`, `backend/src/ids/anomalyDetector.js`): Before delivery, packets are scored for abuse, spam, or traffic-pattern anomalies. Suspicious messages are dropped or logged.
5. **Delivery & persistence** (`backend/src/controllers/message.controller.js`, `backend/src/models/message.model.js`): Clean packets are delivered over Socket.IO in real time and persisted to MongoDB for history syncing.

### Security Layers

- **Anonymity envelope**: The relay simulation mirrors Tor’s guard/middle/exit design so no single hop has full conversation context.
- **Forward secrecy**: Session keys rotate automatically at configurable intervals (see `backend/src/ids/idsConfig.js`).
- **Data minimization**: Message metadata stored in MongoDB excludes routing history to reduce forensic clues.

### Observability & Logging

- `backend/src/ids/eventLogger.js` centralizes structured logs for relay hops, detections, and user actions.
- Logs can be streamed to external SIEM tooling by extending `eventLogger.js`.

For deeper diagrams and configuration nuances, review:

- [Architecture Documentation](Documentations/ARCHITECTURE.md)
- [Quick Reference](Documentations/QUICK_REFERENCE.md)
- [IDS Config Walkthrough](backend/src/ids/idsConfig.js)

---

## Key Features

- **Anonymity**: Messages are routed through a multi-layered Tor network, making it nearly impossible to trace the source or destination.
- **End-to-End Encryption**: All messages are encrypted to ensure that only the intended recipient can read them.
- **Real-Time Communication**: Enjoy seamless and instant messaging with a robust backend powered by Node.js and Socket.IO.
- **Secure Data Storage**: User data and messages are securely stored in a MongoDB database.
- **Cross-Platform Support**: The application is accessible on any device with a modern web browser.

---

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB
- **Encryption**: AES-256 for layered encryption
- **Deployment**: Not publicly hosted; run locally via the dev servers in this repo

---

## Table of Contents

- [SchizoChatPlus](#schizochatplus)
  - [How It Works](#how-it-works)
    - [Message Flow Overview](#message-flow-overview)
    - [Security Layers](#security-layers)
    - [Observability \& Logging](#observability--logging)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [MongoDB Setup](#mongodb-setup)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Set Up Virtual Environment (venv)](#set-up-virtual-environment-venv)
      - [macOS / Linux](#macos--linux)
      - [Windows (CMD / PowerShell)](#windows-cmd--powershell)
    - [Install Dependencies](#install-dependencies)
      - [Backend](#backend)
      - [Frontend](#frontend)
  - [Running the Application](#running-the-application)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Environment Variables](#environment-variables)
  - [Node.js Version](#nodejs-version)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)

---

## Requirements

- Python 3.8+
- Node.js (LTS version 24.x)
- npm (comes with Node.js)
- Git
- Optional: System-level build tools for compiled dependencies (e.g., `build-essential` on Linux)

---

## MongoDB Setup

MongoDB is required as the database for this project. It is used to store user data, messages, and other application-related information. To set up MongoDB:

1. **Install MongoDB**:
   - Follow the official MongoDB installation guide for your operating system: https://www.mongodb.com/docs/manual/installation/

2. **Start the MongoDB Service**:
   - Ensure the MongoDB service is running locally on your machine. By default, it listens on `mongodb://localhost:27017`.

3. **Configure the Connection**:
   - Update the `MONGO_URI` in the `.env` file located in the `backend` directory to point to your MongoDB instance. For example:

     ```env
     MONGO_URI=mongodb://localhost:27017/schizochatplus
     ```

4. **Create the Database**:
   - MongoDB will automatically create the database when the application starts and data is inserted.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/dionjoshualobo/SchizoChatPlus.git
cd SchizoChatPlus
```

### Set Up Virtual Environment (venv)

It is recommended to create an isolated Python environment before installing packages.

#### macOS / Linux

```bash
# Create venv
python3 -m venv .venv

# Activate venv
source .venv/bin/activate

# Verify Python path
which python   # -> .venv/bin/python
which pip      # -> .venv/bin/pip
```

#### Windows (CMD / PowerShell)

```cmd
# Create venv
py -3 -m venv .venv

# Activate venv (CMD)
.\.venv\Scripts\activate

# Activate venv (PowerShell)
.\.venv\Scripts\Activate.ps1

# Verify Python path
where python    # -> .venv\Scripts\python.exe
where pip       # -> .venv\Scripts\pip.exe
```

### Install Dependencies

#### Backend

Navigate to the `backend` directory and install Node.js dependencies:

```bash
cd backend
npm install

# Install Python dependencies
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

#### Frontend

Navigate to the `frontend` directory and install Node.js dependencies:

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Backend

Start the backend server:

```bash
cd backend
python -m pip install python-dotenv  # Ensure dotenv is installed
npm run dev
```

### Frontend

Start the frontend development server:

```bash
cd ../frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add a `.env` file in the `frontend` directory if needed for frontend-specific configurations.

---

## Node.js Version

This project requires Node.js version 24.x. Ensure you are using the correct version:

```bash
node -v  # Check Node.js version
```

If you need to switch versions, use a version manager like `nvm`:

```bash
nvm install 24
nvm use 24
```

---

## Troubleshooting

- **Python version issues**: Ensure Python 3.8+ is installed and accessible via `python3` or `py`.
- **Node.js version mismatch**: Use Node.js 24.x as specified.
- **Permission errors**: Run commands with appropriate permissions or use a virtual environment.
- **Missing dependencies**: Ensure all dependencies are installed using `pip install -r requirements.txt` and `npm install`.
- **PowerShell activation blocked**: Run the following command in PowerShell:

  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
