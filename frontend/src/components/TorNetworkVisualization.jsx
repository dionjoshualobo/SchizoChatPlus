import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { axiosInstance } from "../lib/axios";

export default function TorNetworkVisualization() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Fetch data from the backend route
    const fetchVisualizationData = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5001/tornodes/visualization");
        const { nodes: backendNodes, edges: backendEdges } = response.data;

        // Map backend data to React Flow format
        const formattedNodes = backendNodes.map((node) => ({
          id: node.id,
          position: { x: node.x, y: node.y },
          data: { label: node.label },
        }));

        const formattedEdges = backendEdges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        }));

        setNodes(formattedNodes);
        setEdges(formattedEdges);
      } catch (error) {
        console.error("Error fetching visualization data:", error);
      }
    };

    fetchVisualizationData();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
