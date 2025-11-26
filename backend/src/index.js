import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

import { connectDB } from "./lib/db.js";
import { startTorSim, stopTorSim } from "./lib/torsim.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import tornodesRoute from "./routes/tornodes.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Increase payload size limit
app.use(express.json({ limit: "10mb" })); // Allow payloads up to 10 MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // For URL-encoded data

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
  startTorSim(); // Start the Python TOR simulation process

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

// Gracefully stop the Python TOR simulation process on exit
process.on("SIGINT", () => {
  stopTorSim();
  process.exit();
});
process.on("SIGTERM", () => {
  stopTorSim();
  process.exit();
});
