# SchizoChatPlus

SchizoChatPlus is a cutting-edge chat application designed with a strong focus on anonymity and privacy. By leveraging a Tor-like network for message routing, it ensures that user identities and communication remain secure and untraceable. This application is ideal for individuals and organizations that prioritize confidentiality in their communications.

---

## Key Features

- **Anonymity**: Messages are routed through a multi-layered Tor network, making it nearly impossible to trace the source or destination.
- **End-to-End Encryption**: All messages are encrypted to ensure that only the intended recipient can read them.
- **Real-Time Communication**: Enjoy seamless and instant messaging with a robust backend powered by Node.js and Socket.IO.
- **Secure Data Storage**: User data and messages are securely stored in a MongoDB database.
- **Cross-Platform Support**: The application is accessible on any device with a modern web browser.

---

## How It Works

1. **Message Routing**:
   - Messages are encapsulated in Tor packets and routed through multiple nodes (entry, middle, and exit) to ensure anonymity.
   - Each node decrypts only its layer of encryption, ensuring that no single node knows both the source and destination.

2. **Encryption**:
   - Messages are encrypted using AES-256 encryption, with each layer of the Tor network adding an additional layer of security.

3. **Real-Time Updates**:
   - The application uses Socket.IO to provide real-time updates, ensuring that messages are delivered instantly.

4. **Database Integration**:
   - MongoDB is used to store user data, chat histories, and other essential information securely.

---

## Why Choose SchizoChatPlus?

- **Privacy First**: Designed for users who value their privacy and want to communicate without fear of surveillance.
- **Advanced Security**: Combines the power of Tor routing and end-to-end encryption for unparalleled security.
- **User-Friendly**: A simple and intuitive interface ensures that anyone can use the app without technical expertise.
- **Scalable**: Built with modern technologies to handle a growing user base and high message volumes.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up Virtual Environment (venv)](#set-up-virtual-environment-venv)
  - [Install Dependencies](#install-dependencies)
- [Running the Application](#running-the-application)
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

## Project Scope

This project is designed to run completely locally. It is not hosted online or accessible over the internet. All components, including the backend, frontend, and database, are intended to be set up and executed on your local machine.

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

