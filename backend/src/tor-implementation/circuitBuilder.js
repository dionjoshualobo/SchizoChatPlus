import RelayNode from './relayNode.js';

/**
 * CircuitBuilder - Builds Tor circuits through multiple relay nodes
 * This is dummy implementation for educational purposes
 */
export class CircuitBuilder {
  constructor() {
    this.circuits = new Map();
    this.nodes = new Map();
    this.circuitId = 0;
    
    console.log('🏗️  CircuitBuilder initialized');
  }

  /**
   * Initialize the Tor network with relay nodes
   */
  initializeNetwork() {
    console.log('🌐 Initializing Tor Network...');
    
    // Create entry nodes
    for (let i = 1; i <= 3; i++) {
      const node = new RelayNode(`entry-${i}`, 'entry');
      this.nodes.set(node.id, node);
    }
    
    // Create middle nodes
    for (let i = 1; i <= 5; i++) {
      const node = new RelayNode(`middle-${i}`, 'middle');
      this.nodes.set(node.id, node);
    }
    
    // Create exit nodes
    for (let i = 1; i <= 2; i++) {
      const node = new RelayNode(`exit-${i}`, 'exit');
      this.nodes.set(node.id, node);
    }
    
    console.log(`✅ Network initialized with ${this.nodes.size} nodes`);
    console.log(`   - Entry nodes: 3`);
    console.log(`   - Middle nodes: 5`);
    console.log(`   - Exit nodes: 2`);
  }

  /**
   * Build a circuit through 3 random relay nodes
   */
  buildCircuit() {
    const circuitId = `circuit-${++this.circuitId}`;
    
    console.log(`🔗 Building new circuit: ${circuitId}`);
    
    // Select random nodes for the circuit
    const entryNodes = Array.from(this.nodes.values()).filter(n => n.type === 'entry');
    const middleNodes = Array.from(this.nodes.values()).filter(n => n.type === 'middle');
    const exitNodes = Array.from(this.nodes.values()).filter(n => n.type === 'exit');
    
    if (entryNodes.length === 0 || middleNodes.length === 0 || exitNodes.length === 0) {
      console.log('❌ Cannot build circuit: Not enough nodes');
      return null;
    }
    
    const circuit = {
      id: circuitId,
      entryNode: entryNodes[Math.floor(Math.random() * entryNodes.length)],
      middleNode: middleNodes[Math.floor(Math.random() * middleNodes.length)],
      exitNode: exitNodes[Math.floor(Math.random() * exitNodes.length)],
      createdAt: new Date(),
      status: 'active'
    };
    
    this.circuits.set(circuitId, circuit);
    
    console.log(`✅ Circuit built: ${circuit.entryNode.id} → ${circuit.middleNode.id} → ${circuit.exitNode.id}`);
    
    return circuit;
  }

  /**
   * Route a message through a circuit
   */
  routeMessage(message, circuitId) {
    const circuit = this.circuits.get(circuitId);
    
    if (!circuit) {
      console.log('❌ Circuit not found');
      return false;
    }
    
    console.log(`📨 Routing message through circuit ${circuitId}`);
    
    // Simulate onion encryption (dummy)
    let encryptedMessage = this.encryptForCircuit(message, circuit);
    
    // Route through entry node
    console.log(`📍 Step 1: Entry node (${circuit.entryNode.id})`);
    encryptedMessage = circuit.entryNode.receivePacket(encryptedMessage);
    circuit.entryNode.forwardPacket(encryptedMessage, circuit.middleNode.id);
    
    // Route through middle node
    setTimeout(() => {
      console.log(`📍 Step 2: Middle node (${circuit.middleNode.id})`);
      encryptedMessage = circuit.middleNode.receivePacket(encryptedMessage);
      circuit.middleNode.forwardPacket(encryptedMessage, circuit.exitNode.id);
    }, 100);
    
    // Route through exit node
    setTimeout(() => {
      console.log(`📍 Step 3: Exit node (${circuit.exitNode.id})`);
      const finalMessage = circuit.exitNode.receivePacket(encryptedMessage);
      circuit.exitNode.forwardPacket(finalMessage, 'destination');
      
      console.log(`✅ Message delivered: "${message.text}"`);
    }, 200);
    
    return true;
  }

  /**
   * Simulate onion encryption (dummy implementation)
   */
  encryptForCircuit(message, circuit) {
    console.log('🧅 Creating onion encryption layers...');
    
    // In real Tor, this would apply multiple layers of encryption
    // For demo purposes, we'll just wrap the message
    return {
      layers: 3,
      payload: message,
      circuit: circuit.id
    };
  }

  /**
   * Get all circuits
   */
  getCircuits() {
    return Array.from(this.circuits.values());
  }

  /**
   * Get all nodes
   */
  getNodes() {
    return Array.from(this.nodes.values()).map(node => node.getNodeInfo());
  }

  /**
   * Get network statistics
   */
  getNetworkStats() {
    const totalPackets = Array.from(this.nodes.values())
      .reduce((sum, node) => sum + node.packetCount, 0);
    
    return {
      totalNodes: this.nodes.size,
      totalCircuits: this.circuits.size,
      totalPackets,
      networkStatus: 'active'
    };
  }
}

export default CircuitBuilder;
