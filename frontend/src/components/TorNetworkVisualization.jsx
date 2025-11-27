import React, { useEffect, useState } from "react";
import axios from "axios";

const nodeColors = {
  entry: "#4F8A8B",
  middle: "#F9ED69",
  exit: "#F08A5D",
  guard: "#B83B5E",
  bridge: "#6A2C70"
};

// Node layout positions for a simple network (inspired by Excalidraw example)
const nodeLayout = [
  { x: 120, y: 120 }, // Entry 1
  { x: 120, y: 240 }, // Entry 2
  { x: 320, y: 80 },  // Middle 1
  { x: 320, y: 180 }, // Middle 2
  { x: 320, y: 280 }, // Middle 3
  { x: 520, y: 120 }, // Exit 1
  { x: 520, y: 240 }, // Exit 2
  { x: 220, y: 40 },  // Guard
  { x: 420, y: 320 }  // Bridge
];

export default function TorNetworkVisualization() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get("/tornodes")
      .then(res => setNodes(Array.isArray(res.data.nodes) ? res.data.nodes : []))
      .catch(() => setNodes([]));
  }, []);

  if (!Array.isArray(nodes) || nodes.length === 0) return <div>Loading TOR network...</div>;

  return (
    <div style={{ textAlign: "center", margin: 32 }}>
      <h2>TOR Network Visualization</h2>
      <svg width={700} height={400} style={{ background: '#222', borderRadius: 12, boxShadow: '0 2px 8px #0004' }}>
        {/* Draw connections (example: entry to middle, middle to exit) */}
        {/* Entry nodes to all middle nodes */}
        {nodes.slice(0,2).map((entry, i) =>
          nodes.slice(2,5).map((middle, j) => (
            <line
              key={`e${i}-m${j}`}
              x1={nodeLayout[i].x}
              y1={nodeLayout[i].y}
              x2={nodeLayout[2+j].x}
              y2={nodeLayout[2+j].y}
              stroke="#888"
              strokeWidth={2}
            />
          ))
        )}
        {/* Middle nodes to all exit nodes */}
        {nodes.slice(2,5).map((middle, i) =>
          nodes.slice(5,7).map((exit, j) => (
            <line
              key={`m${i}-x${j}`}
              x1={nodeLayout[2+i].x}
              y1={nodeLayout[2+i].y}
              x2={nodeLayout[5+j].x}
              y2={nodeLayout[5+j].y}
              stroke="#888"
              strokeWidth={2}
            />
          ))
        )}
        {/* Guard to Entry nodes */}
        <line x1={nodeLayout[7].x} y1={nodeLayout[7].y} x2={nodeLayout[0].x} y2={nodeLayout[0].y} stroke="#B83B5E" strokeWidth={2} />
        <line x1={nodeLayout[7].x} y1={nodeLayout[7].y} x2={nodeLayout[1].x} y2={nodeLayout[1].y} stroke="#B83B5E" strokeWidth={2} />
        {/* Bridge to Middle nodes */}
        <line x1={nodeLayout[8].x} y1={nodeLayout[8].y} x2={nodeLayout[2].x} y2={nodeLayout[2].y} stroke="#6A2C70" strokeWidth={2} />
        <line x1={nodeLayout[8].x} y1={nodeLayout[8].y} x2={nodeLayout[3].x} y2={nodeLayout[3].y} stroke="#6A2C70" strokeWidth={2} />
        {/* Draw nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={nodeLayout[i].x}
              cy={nodeLayout[i].y}
              r={24}
              fill={nodeColors[node.type] || "#ccc"}
              stroke="#fff"
              strokeWidth={2}
            />
            <text x={nodeLayout[i].x} y={nodeLayout[i].y-30} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">
              {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
            </text>
            <text x={nodeLayout[i].x} y={nodeLayout[i].y+38} textAnchor="middle" fill="#aaa" fontSize={11}>
              Port {node.port}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
