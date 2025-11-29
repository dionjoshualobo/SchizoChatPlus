import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import os from "os";
import { spawn } from "child_process";

import { connectDB } from "./lib/db.js";
import { startTorSim, stopTorSim } from "./lib/torsim.js";
import { io } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import tornodesRoute from "./routes/tornodes.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const __dirname = path.resolve();
const pythonNodeProcesses = [];

const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins =
  process.env.ALLOW_ALL_ORIGINS === "true" ||
  process.env.NODE_ENV !== "production" ||
  allowedOrigins.includes("*");

// Increase payload size limit
app.use(express.json({ limit: "10mb" })); // Allow payloads up to 10 MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // For URL-encoded data

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        allowAllOrigins ||
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes(getOriginWithoutPort(origin)) ||
        allowedOrigins.includes(getOriginHostname(origin))
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Attach Socket.IO instance to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/tornodes", tornodesRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(PORT, HOST, () => {
  const lanAddress = HOST === "0.0.0.0" ? getLocalIPAddress() : HOST;
  console.log(`Server is running on http://${HOST}:${PORT}`);
  if (lanAddress) {
    console.log(`LAN access:   http://${lanAddress}:${PORT}`);
  } else {
    console.log("LAN access:   unable to detect local IP (check network interfaces)");
  }
  connectDB();
  startTorSim(); // Start the Python TOR simulation process

  // Start the TOR node servers when the backend starts
  startPythonNode("./entry_node.py", "Entry node server");
  startPythonNode("./middle_node.py", "Middle node server");
  startPythonNode("./exit_node.py", "Exit node server");

  // Tor Implementation Demo - Real Node Logging (using fs instead of import)
  const configPath = path.resolve("./tor_sim/tor_nodes_config.json");
  try {
    const configRaw = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(configRaw);
    const nodes = config.nodes;
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        console.log(`🔗 Node ${node.id} created (${node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node) on port ${node.port}`);
      }, 1000 + idx * 500);
    });
    setTimeout(() => console.log("✅ Tor Demo Network Ready (Educational only)\n"), 1000 + nodes.length * 500);
  } catch (err) {
    console.error("Error loading Tor nodes config:", err);
  }
});

// Function to start a Python TOR node server
function startPythonNode(script, label) {
  const nodeProcess = spawn("python3", [script], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  nodeProcess.on("error", (error) => {
    console.error(`Failed to start ${label}:`, error.message);
  });

  nodeProcess.on("exit", (code) => {
    console.log(`${label} exited with code ${code}`);
  });

  pythonNodeProcesses.push({ label, process: nodeProcess });
}

// Function to stop all spawned Python node servers
function stopPythonNodes() {
  pythonNodeProcesses.forEach(({ label, process: nodeProcess }) => {
    if (nodeProcess && !nodeProcess.killed) {
      nodeProcess.kill();
      console.log(`${label} stopped.`);
    }
  });
  pythonNodeProcesses.length = 0;
}

function handleShutdown() {
  stopTorSim();
  stopPythonNodes();
}

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const ifaceName of Object.keys(interfaces)) {
    for (const iface of interfaces[ifaceName] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

function getOriginWithoutPort(origin) {
  try {
    const url = new URL(origin);
    return `${url.protocol}//${url.hostname}`;
  } catch (error) {
    return origin;
  }
}

function getOriginHostname(origin) {
  try {
    const url = new URL(origin);
    return url.hostname;
  } catch (error) {
    return origin;
  }
}

// Gracefully stop the Python TOR simulation process on exit
process.on("SIGINT", () => {
  handleShutdown();
  process.exit();
});
process.on("SIGTERM", () => {
  handleShutdown();
  process.exit();
});
process.on("exit", handleShutdown);
process.once("SIGUSR2", () => {
  handleShutdown();
  process.kill(process.pid, "SIGUSR2");
});
