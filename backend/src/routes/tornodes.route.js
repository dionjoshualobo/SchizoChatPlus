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
    let html = `
      <html>
      <head><title>TOR Node Visualization</title></head>
      <body style='background:#222;color:#fff;font-family:sans-serif;text-align:center;'>
        <h2>TOR Network Visualization</h2>
        <svg width='${200 + nodes.length * 70}' height='180' style='background:#222;border-radius:12px;box-shadow:0 2px 8px #0004;'>
          <circle cx='50' cy='90' r='24' fill='#3A6351'/>
          <text x='50' y='95' text-anchor='middle' fill='#fff' font-size='14'>Sender</text>
          ${nodes.map((node,i)=>`
            <g>
              <circle cx='${140+i*70}' cy='90' r='20' fill='${{
                entry:'#4F8A8B',middle:'#F9ED69',exit:'#F08A5D',guard:'#B83B5E',bridge:'#6A2C70'
              }[node.type]||"#ccc"}' stroke='#222' stroke-width='2'/>
              <text x='${140+i*70}' y='95' text-anchor='middle' fill='#222' font-size='12'>${node.type.charAt(0).toUpperCase()+node.type.slice(1)}</text>
              <text x='${140+i*70}' y='115' text-anchor='middle' fill='#888' font-size='10'>Port ${node.port}</text>
              ${i>0?`<line x1='${140+(i-1)*70+20}' y1='90' x2='${140+i*70-20}' y2='90' stroke='#888' stroke-width='2' marker-end='url(#arrow)'/>`:''}
            </g>
          `).join('')}
          <circle cx='${140+nodes.length*70}' cy='90' r='24' fill='#3A6351'/>
          <text x='${140+nodes.length*70}' y='95' text-anchor='middle' fill='#fff' font-size='14'>Receiver</text>
          <line x1='${140+(nodes.length-1)*70+20}' y1='90' x2='${140+nodes.length*70-24}' y2='90' stroke='#888' stroke-width='2' marker-end='url(#arrow)'/>
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
