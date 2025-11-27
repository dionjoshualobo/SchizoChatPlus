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
      <head>
        <title>TOR Node Visualization</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
          :root{--page-bg:#0b1117;--card-bg:rgba(17,24,39,0.65);--muted:#9aa0a6;--text:#e6eef0}
          html,body{height:100%;margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial}
          body{background:var(--page-bg);color:var(--text);display:flex;flex-direction:column;align-items:center;padding-top:72px}
          .container{max-width:1000px;width:calc(100% - 48px);padding:36px;border-radius:12px;background:var(--card-bg);box-shadow:0 8px 30px rgba(2,6,23,0.7);border:1px solid rgba(255,255,255,0.02)}
          h2{margin:0 0 18px 0;font-size:20px}
          svg{display:block;margin:0 auto;border-radius:12px}
          .legend{display:flex;gap:12px;align-items:center;justify-content:center;margin-top:10px;color:var(--muted);font-size:13px}
        </style>
      </head>
      <body>
        <div class="container">
          <h2>TOR Network Visualization</h2>
          <div style="overflow:auto;padding:8px;">
            <svg width='${200 + nodes.length * 70}' height='180' >
              <circle cx='50' cy='90' r='24' fill='#3A6351'/>
              <text x='50' y='95' text-anchor='middle' fill='#fff' font-size='14'>Sender</text>
              ${nodes.map((node,i)=>`
                <g>
                  <circle cx='${140+i*70}' cy='90' r='20' fill='${{
                    entry:'#4F8A8B',middle:'#F9ED69',exit:'#F08A5D',guard:'#B83B5E',bridge:'#6A2C70'
                  }[node.type]||"#ccc"}' stroke='rgba(0,0,0,0.15)' stroke-width='2'/>
                  <text x='${140+i*70}' y='95' text-anchor='middle' fill='#0b1117' font-size='12'>${node.type.charAt(0).toUpperCase()+node.type.slice(1)}</text>
                  <text x='${140+i*70}' y='115' text-anchor='middle' fill='var(--muted)' font-size='10'>Port ${node.port}</text>
                  ${i>0?`<line x1='${140+(i-1)*70+20}' y1='90' x2='${140+i*70-20}' y2='90' stroke='rgba(150,150,150,0.25)' stroke-width='2' marker-end='url(#arrow)'/>`:''}
                </g>
              `).join('')}
              <circle cx='${140+nodes.length*70}' cy='90' r='24' fill='#3A6351'/>
              <text x='${140+nodes.length*70}' y='95' text-anchor='middle' fill='#fff' font-size='14'>Receiver</text>
              <line x1='${140+(nodes.length-1)*70+20}' y1='90' x2='${140+nodes.length*70-24}' y2='90' stroke='rgba(150,150,150,0.25)' stroke-width='2' marker-end='url(#arrow)'/>
              <defs>
                <marker id='arrow' markerWidth='10' markerHeight='7' refX='10' refY='3.5' orient='auto' markerUnits='strokeWidth'>
                  <polygon points='0 0, 10 3.5, 0 7' fill='rgba(150,150,150,0.7)'/>
                </marker>
              </defs>
            </svg>
          </div>
          <div class="legend">
            <div><span style="display:inline-block;width:12px;height:12px;background:#4F8A8B;border-radius:3px;margin-right:6px"></span>Entry</div>
            <div><span style="display:inline-block;width:12px;height:12px;background:#F9ED69;border-radius:3px;margin-right:6px"></span>Middle</div>
            <div><span style="display:inline-block;width:12px;height:12px;background:#F08A5D;border-radius:3px;margin-right:6px"></span>Exit</div>
            <div><span style="display:inline-block;width:12px;height:12px;background:#B83B5E;border-radius:3px;margin-right:6px"></span>Guard</div>
            <div><span style="display:inline-block;width:12px;height:12px;background:#6A2C70;border-radius:3px;margin-right:6px"></span>Bridge</div>
          </div>
        </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send("Could not generate visualization");
  }
});

export default router;
