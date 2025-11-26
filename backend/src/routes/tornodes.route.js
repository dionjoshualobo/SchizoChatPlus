import express from "express";
import axios from "axios";

const router = express.Router();

// GET /tornodes - returns the simulated TOR nodes
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/nodes");
    res.json({ nodes: response.data });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch TOR nodes" });
  }
});

export default router;
