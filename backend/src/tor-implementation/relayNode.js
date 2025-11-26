import crypto from 'crypto';

/**
 * RelayNode - Simulates a Tor relay node
 * This is dummy implementation for educational purposes
 */
export class RelayNode {
  constructor(id, type) {
    this.id = id;
    this.type = type; // 'entry', 'middle', or 'exit'
    this.status = 'active';
    this.createdAt = new Date();
    this.packetCount = 0;
    
    // Generate RSA key pair for this node (dummy keys)
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024, // Smaller for demo purposes
    });
    
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    
    console.log(`🔗 Tor Node ${this.id} created - Type: ${this.type.toUpperCase()}`);
  }

  /**
   * Simulates receiving and decrypting one layer of onion encryption
   */
  receivePacket(encryptedPacket) {
    this.packetCount++;
    console.log(`📦 Node ${this.id} received packet #${this.packetCount}`);
    
    try {
      // Simulate decryption (dummy implementation)
      const decrypted = this.decryptLayer(encryptedPacket);
      console.log(`🔓 Node ${this.id} decrypted layer successfully`);
      
      return decrypted;
    } catch (error) {
      console.log(`❌ Node ${this.id} failed to decrypt packet`);
      return null;
    }
  }

  /**
   * Simulates onion layer decryption
   */
  decryptLayer(encryptedData) {
    // This is a dummy implementation - in real Tor, this would decrypt actual onion layers
    if (typeof encryptedData === 'string') {
      try {
        return JSON.parse(encryptedData);
      } catch {
        return { nextHop: null, payload: encryptedData };
      }
    }
    return encryptedData;
  }

  /**
   * Forwards packet to next relay or destination
   */
  forwardPacket(packet, nextNodeId) {
    console.log(`➡️  Node ${this.id} forwarding packet to ${nextNodeId || 'destination'}`);
    
    // Simulate network latency
    setTimeout(() => {
      console.log(`✅ Node ${this.id} packet forwarded successfully`);
    }, Math.random() * 100 + 50); // 50-150ms delay
  }

  /**
   * Get node information
   */
  getNodeInfo() {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
      packetCount: this.packetCount,
      publicKey: this.publicKey.export({ type: 'pkcs1', format: 'pem' })
    };
  }

  /**
   * Simulate node going offline/online
   */
  toggleStatus() {
    this.status = this.status === 'active' ? 'inactive' : 'active';
    console.log(`🔄 Node ${this.id} is now ${this.status.toUpperCase()}`);
  }
}

export default RelayNode;
