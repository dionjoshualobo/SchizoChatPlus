import CircuitBuilder from './circuitBuilder.js';
import EncryptionLayer from './encryptionLayer.js';

/**
 * RoutingEngine - Manages message routing through Tor network
 * This is dummy implementation for educational purposes
 */
export class RoutingEngine {
  constructor() {
    this.circuitBuilder = new CircuitBuilder();
    this.encryptionLayer = new EncryptionLayer();
    this.activeCircuits = new Map();
    this.messageQueue = [];
    this.routingStats = {
      messagesRouted: 0,
      circuitsCreated: 0,
      averageLatency: 0,
      failureRate: 0
    };
    
    console.log('🚀 RoutingEngine initialized');
    this.initializeNetwork();
  }

  /**
   * Initialize the Tor network
   */
  initializeNetwork() {
    console.log('🌐 Starting Tor Network initialization...');
    this.circuitBuilder.initializeNetwork();
    
    // Create initial circuits
    for (let i = 0; i < 3; i++) {
      const circuit = this.circuitBuilder.buildCircuit();
      if (circuit) {
        this.activeCircuits.set(circuit.id, circuit);
        this.routingStats.circuitsCreated++;
      }
    }
    
    console.log(`✅ RoutingEngine ready with ${this.activeCircuits.size} circuits`);
  }

  /**
   * Route a message through the Tor network
   */
  async routeMessage(message, options = {}) {
    console.log(`📨 Routing message: "${message.text?.substring(0, 50)}..."`);
    
    const startTime = Date.now();
    
    try {
      // Select or create a circuit
      let circuit = this.selectBestCircuit(options);
      
      if (!circuit) {
        console.log('🔄 No available circuits, building new one...');
        circuit = this.circuitBuilder.buildCircuit();
        
        if (circuit) {
          this.activeCircuits.set(circuit.id, circuit);
          this.routingStats.circuitsCreated++;
        } else {
          throw new Error('Failed to build circuit');
        }
      }
      
      console.log(`🛣️  Using circuit: ${circuit.id}`);
      console.log(`📍 Route: ${circuit.entryNode.id} → ${circuit.middleNode.id} → ${circuit.exitNode.id}`);
      
      // Create onion encryption
      const onionPacket = this.encryptionLayer.createOnionLayers(message, circuit);
      
      // Route through the circuit
      const result = await this.routeThroughCircuit(onionPacket, circuit);
      
      // Update statistics
      const latency = Date.now() - startTime;
      this.updateStats(latency, true);
      
      console.log(`✅ Message routed successfully in ${latency}ms`);
      
      return {
        success: true,
        circuitId: circuit.id,
        latency: latency,
        hops: 3,
        message: result
      };
      
    } catch (error) {
      const latency = Date.now() - startTime;
      this.updateStats(latency, false);
      
      console.log(`❌ Message routing failed: ${error.message}`);
      
      return {
        success: false,
        error: error.message,
        latency: latency
      };
    }
  }

  /**
   * Route message through a specific circuit
   */
  async routeThroughCircuit(onionPacket, circuit) {
    const steps = [
      { node: circuit.entryNode, name: 'Entry' },
      { node: circuit.middleNode, name: 'Middle' },
      { node: circuit.exitNode, name: 'Exit' }
    ];
    
    let currentPacket = onionPacket;
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      console.log(`📍 Step ${i + 1}: ${step.name} node (${step.node.id})`);
      
      // Simulate processing time
      await this.simulateProcessingDelay();
      
      // Decrypt one layer
      currentPacket = this.encryptionLayer.peelLayer(currentPacket, step.node.id);
      
      if (!currentPacket) {
        throw new Error(`Decryption failed at ${step.name} node`);
      }
      
      // Update node packet count
      step.node.receivePacket(currentPacket);
      
      if (i < steps.length - 1) {
        const nextNode = steps[i + 1].node;
        step.node.forwardPacket(currentPacket, nextNode.id);
        console.log(`➡️  Forwarding to ${nextNode.id}`);
      }
    }
    
    return currentPacket;
  }

  /**
   * Select the best available circuit
   */
  selectBestCircuit(options) {
    const availableCircuits = Array.from(this.activeCircuits.values())
      .filter(circuit => circuit.status === 'active');
    
    if (availableCircuits.length === 0) {
      return null;
    }
    
    // Simple selection: least recently used
    return availableCircuits.reduce((best, current) => {
      return current.createdAt < best.createdAt ? current : best;
    });
  }

  /**
   * Simulate network processing delay
   */
  simulateProcessingDelay() {
    const delay = Math.random() * 50 + 25; // 25-75ms
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Update routing statistics
   */
  updateStats(latency, success) {
    this.routingStats.messagesRouted++;
    
    if (success) {
      const totalLatency = this.routingStats.averageLatency * (this.routingStats.messagesRouted - 1) + latency;
      this.routingStats.averageLatency = totalLatency / this.routingStats.messagesRouted;
    } else {
      this.routingStats.failureRate = (this.routingStats.failureRate * (this.routingStats.messagesRouted - 1) + 1) / this.routingStats.messagesRouted;
    }
  }

  /**
   * Get routing statistics
   */
  getRoutingStats() {
    return {
      ...this.routingStats,
      activeCircuits: this.activeCircuits.size,
      networkNodes: this.circuitBuilder.getNodes().length,
      uptime: new Date() - this.startTime || new Date()
    };
  }

  /**
   * Get network status
   */
  getNetworkStatus() {
    const nodes = this.circuitBuilder.getNodes();
    const circuits = Array.from(this.activeCircuits.values());
    
    return {
      nodes: {
        total: nodes.length,
        active: nodes.filter(n => n.status === 'active').length,
        byType: {
          entry: nodes.filter(n => n.type === 'entry').length,
          middle: nodes.filter(n => n.type === 'middle').length,
          exit: nodes.filter(n => n.type === 'exit').length
        }
      },
      circuits: {
        total: circuits.length,
        active: circuits.filter(c => c.status === 'active').length
      },
      performance: this.routingStats,
      lastUpdate: new Date()
    };
  }

  /**
   * Cleanup old circuits
   */
  cleanupCircuits() {
    const now = Date.now();
    const maxAge = 10 * 60 * 1000; // 10 minutes
    
    for (const [circuitId, circuit] of this.activeCircuits) {
      if (now - circuit.createdAt.getTime() > maxAge) {
        console.log(`🧹 Cleaning up old circuit: ${circuitId}`);
        this.activeCircuits.delete(circuitId);
      }
    }
  }
}

export default RoutingEngine;
