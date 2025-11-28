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

// GET /tornodes/visualization - returns a simple HTML visualization
router.get("/visualization", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/nodes");
    const nodes = response.data;

    // Define positions for layered layout with corrected Guard and Bridge placement
    const positions = [
      { id: "sender", x: 100, y: 250, label: "Sender", color: "#3A6351" },
      { id: "bridge", x: 300, y: 250, label: "Bridge", color: "#6A2C70" },
      { id: "guard", x: 500, y: 250, label: "Guard", color: "#B83B5E" },
      { id: "entry1", x: 700, y: 150, label: "Entry Node 1", color: "#4F8A8B" },
      { id: "entry2", x: 700, y: 350, label: "Entry Node 2", color: "#4F8A8B" },
      { id: "middle1", x: 900, y: 100, label: "Middle Node 1", color: "#F9ED69" },
      { id: "middle2", x: 900, y: 250, label: "Middle Node 2", color: "#F9ED69" },
      { id: "middle3", x: 900, y: 400, label: "Middle Node 3", color: "#F9ED69" },
      { id: "exit1", x: 1100, y: 150, label: "Exit Node 1", color: "#F08A5D" },
      { id: "exit2", x: 1100, y: 350, label: "Exit Node 2", color: "#F08A5D" },
      { id: "receiver", x: 1300, y: 250, label: "Receiver", color: "#3A6351" },
    ];

    let html = `
      <html>
      <head><title>TOR Node Visualization</title></head>
      <body style='background:#222;color:#fff;font-family:sans-serif;text-align:center;'>
        <h2>TOR Network Visualization</h2>
        <svg width='1400' height='600' style='background:#222;border-radius:12px;box-shadow:0 2px 8px #0004;'>
          ${positions.map((node) => `
            <g>
              <circle cx='${node.x}' cy='${node.y}' r='30' fill='${node.color}' stroke='#222' stroke-width='2'/>
              <text x='${node.x}' y='${node.y + 5}' text-anchor='middle' fill='#fff' font-size='14'>${node.label}</text>
            </g>
          `).join('')}

          ${[
            { from: "sender", to: "bridge" },
            { from: "bridge", to: "guard" },
            { from: "guard", to: "entry1" },
            { from: "guard", to: "entry2" },
            { from: "entry1", to: "middle1" },
            { from: "entry1", to: "middle2" },
            { from: "entry1", to: "middle3" },
            { from: "entry2", to: "middle1" },
            { from: "entry2", to: "middle2" },
            { from: "entry2", to: "middle3" },
            { from: "middle1", to: "exit1" },
            { from: "middle1", to: "exit2" },
            { from: "middle2", to: "exit1" },
            { from: "middle2", to: "exit2" },
            { from: "middle3", to: "exit1" },
            { from: "middle3", to: "exit2" },
            { from: "exit1", to: "receiver" },
            { from: "exit2", to: "receiver" },
          ].map((connection) => {
            const fromNode = positions.find((node) => node.id === connection.from);
            const toNode = positions.find((node) => node.id === connection.to);
            return `
              <line x1='${fromNode.x + 30}' y1='${fromNode.y}' x2='${toNode.x - 30}' y2='${toNode.y}' stroke='#888' stroke-width='2' marker-end='url(#arrow)'/>
            `;
          }).join('')}

          <defs>
            <marker id='arrow' markerWidth='10' markerHeight='7' refX='10' refY='3.5' orient='auto' markerUnits='strokeWidth'>
              <polygon points='0 0, 10 3.5, 0 7' fill='#888'/>
            </marker>
          </defs>
        </svg>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send("Could not generate visualization");
  }
});

export default router;
