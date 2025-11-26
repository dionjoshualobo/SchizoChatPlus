import React, { useEffect, useState } from "react";
import axios from "axios";

const nodeColors = {
  entry: "#4F8A8B",
  middle: "#F9ED69",
  exit: "#F08A5D",
  guard: "#B83B5E",
  bridge: "#6A2C70"
};

export default function TorNetworkVisualization() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get("/tornodes")
      .then(res => setNodes(Array.isArray(res.data.nodes) ? res.data.nodes : []))
      .catch(() => setNodes([]));
  }, []);

  if (!Array.isArray(nodes) || nodes.length === 0) return <div>Loading TOR network...</div>;

  // Calculate dynamic SVG width
  const svgWidth = 200 + nodes.length * 70;

  return (
    <div style={{ textAlign: "center", margin: 32 }}>
      <h2>TOR Network Visualization</h2>
      <svg width={svgWidth} height={180} style={{ background: '#222', borderRadius: 12, boxShadow: '0 2px 8px #0004' }}>
        {/* Sender */}
        <circle cx={50} cy={90} r={24} fill="#3A6351" />
        <text x={50} y={95} textAnchor="middle" fill="#fff" fontSize={14}>Sender</text>
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={140 + i * 70}
              cy={90}
              r={20}
              fill={nodeColors[node.type] || "#ccc"}
              stroke="#222"
              strokeWidth={2}
            />
            <text x={140 + i * 70} y={95} textAnchor="middle" fill="#222" fontSize={12}>
              {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
            </text>
            <text x={140 + i * 70} y={115} textAnchor="middle" fill="#888" fontSize={10}>
              Port {node.port}
            </text>
            {/* Arrow from previous node */}
            {i > 0 && (
              <line
                x1={140 + (i - 1) * 70 + 20}
                y1={90}
                x2={140 + i * 70 - 20}
                y2={90}
                stroke="#888"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}
        {/* Receiver */}
        <circle cx={140 + nodes.length * 70} cy={90} r={24} fill="#3A6351" />
        <text x={140 + nodes.length * 70} y={95} textAnchor="middle" fill="#fff" fontSize={14}>Receiver</text>
        {/* Arrow from last node to receiver */}
        <line
          x1={140 + (nodes.length - 1) * 70 + 20}
          y1={90}
          x2={140 + nodes.length * 70 - 24}
          y2={90}
          stroke="#888"
          strokeWidth={2}
          markerEnd="url(#arrow)"
        />
        {/* Arrow marker definition */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
