import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { startTorSim } from "./lib/torsim.js";

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
  
  // Tor Implementation Demo - Educational Logging Only (Does not affect chat functionality)
  console.log("\n🧅 Tor Network Demo - Educational Simulation");
  console.log("📚 (This is isolated demo code and doesn't affect the chat app)");
  setTimeout(() => console.log("🔗 Node 1 created (Entry Node)"), 1000);
  setTimeout(() => console.log("🔗 Node 2 created (Middle Node)"), 1500);
  setTimeout(() => console.log("🔗 Node 3 created (Exit Node)"), 2000);
  setTimeout(() => console.log("🔗 Node 4 created (Middle Node)"), 2500);
  setTimeout(() => console.log("🔗 Node 5 created (Entry Node)"), 3000);
  setTimeout(() => console.log("✅ Tor Demo Network Ready (Educational only)\n"), 3500);
});
