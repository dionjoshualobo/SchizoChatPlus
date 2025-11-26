/**
 * LatencySimulator - Simulates realistic network latencies for Tor routing
 * This is dummy implementation for educational purposes
 */
export class LatencySimulator {
  constructor() {
    this.baseLatencies = {
      entry: { min: 20, max: 80 },    // Entry node: 20-80ms
      middle: { min: 30, max: 120 },  // Middle node: 30-120ms
      exit: { min: 25, max: 100 }     // Exit node: 25-100ms
    };
    
    this.networkConditions = {
      excellent: 0.8,  // 80% of base latency
      good: 1.0,       // 100% of base latency
      fair: 1.5,       // 150% of base latency
      poor: 2.5,       // 250% of base latency
      terrible: 4.0    // 400% of base latency
    };
    
    this.currentCondition = 'good';
    this.jitterEnabled = true;
    
    console.log('⏱️  LatencySimulator initialized');
  }

  /**
   * Calculate latency for a specific node type
   */
  calculateNodeLatency(nodeType, nodeId) {
    const base = this.baseLatencies[nodeType];
    if (!base) {
      console.log(`❌ Unknown node type: ${nodeType}`);
      return 50; // Default latency
    }

    // Base latency calculation
    let latency = Math.random() * (base.max - base.min) + base.min;
    
    // Apply network conditions
    const conditionMultiplier = this.networkConditions[this.currentCondition];
    latency *= conditionMultiplier;
    
    // Add jitter if enabled
    if (this.jitterEnabled) {
      const jitter = (Math.random() - 0.5) * 0.2; // ±10% jitter
      latency *= (1 + jitter);
    }
    
    // Ensure minimum latency
    latency = Math.max(latency, 5);
    
    console.log(`⏱️  ${nodeId} (${nodeType}): ${Math.round(latency)}ms [${this.currentCondition} conditions]`);
    
    return Math.round(latency);
  }

  /**
   * Calculate total circuit latency
   */
  calculateCircuitLatency(circuit) {
    console.log(`🔗 Calculating latency for circuit: ${circuit.id}`);
    
    const entryLatency = this.calculateNodeLatency('entry', circuit.entryNode.id);
    const middleLatency = this.calculateNodeLatency('middle', circuit.middleNode.id);
    const exitLatency = this.calculateNodeLatency('exit', circuit.exitNode.id);
    
    // Add processing overhead for each hop
    const processingOverhead = 3; // 3ms per hop
    const totalProcessing = processingOverhead * 3;
    
    const totalLatency = entryLatency + middleLatency + exitLatency + totalProcessing;
    
    console.log(`📊 Circuit ${circuit.id} total latency: ${totalLatency}ms`);
    console.log(`   Entry: ${entryLatency}ms | Middle: ${middleLatency}ms | Exit: ${exitLatency}ms | Processing: ${totalProcessing}ms`);
    
    return {
      total: totalLatency,
      breakdown: {
        entry: entryLatency,
        middle: middleLatency,
        exit: exitLatency,
        processing: totalProcessing
      },
      condition: this.currentCondition
    };
  }

  /**
   * Simulate network delay
   */
  async simulateDelay(nodeType, nodeId) {
    const latency = this.calculateNodeLatency(nodeType, nodeId);
    
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`✅ ${nodeId} processing complete (${latency}ms)`);
        resolve(latency);
      }, latency);
    });
  }

  /**
   * Change network conditions
   */
  setNetworkCondition(condition) {
    if (!this.networkConditions[condition]) {
      console.log(`❌ Invalid network condition: ${condition}`);
      return false;
    }
    
    const oldCondition = this.currentCondition;
    this.currentCondition = condition;
    
    console.log(`🌐 Network conditions changed: ${oldCondition} → ${condition}`);
    
    return true;
  }

  /**
   * Toggle jitter simulation
   */
  toggleJitter(enabled) {
    this.jitterEnabled = enabled;
    console.log(`🔀 Jitter simulation: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  /**
   * Simulate packet loss
   */
  simulatePacketLoss() {
    const lossRates = {
      excellent: 0.001, // 0.1%
      good: 0.005,      // 0.5%
      fair: 0.02,       // 2%
      poor: 0.05,       // 5%
      terrible: 0.15    // 15%
    };
    
    const lossRate = lossRates[this.currentCondition];
    const isLost = Math.random() < lossRate;
    
    if (isLost) {
      console.log(`📦 Packet lost due to ${this.currentCondition} network conditions`);
    }
    
    return isLost;
  }

  /**
   * Get latency statistics
   */
  getLatencyStats() {
    return {
      currentCondition: this.currentCondition,
      conditionMultiplier: this.networkConditions[this.currentCondition],
      jitterEnabled: this.jitterEnabled,
      baseLatencies: this.baseLatencies,
      estimatedCircuitLatency: {
        min: Math.round((20 + 30 + 25) * this.networkConditions[this.currentCondition]),
        max: Math.round((80 + 120 + 100) * this.networkConditions[this.currentCondition])
      }
    };
  }

  /**
   * Simulate geographic latency
   */
  simulateGeographicLatency(region1, region2) {
    const distances = {
      'US-EU': { min: 100, max: 150 },
      'US-ASIA': { min: 150, max: 250 },
      'EU-ASIA': { min: 200, max: 300 },
      'LOCAL': { min: 5, max: 25 }
    };
    
    const key = region1 === region2 ? 'LOCAL' : `${region1}-${region2}`;
    const distance = distances[key] || distances['US-EU'];
    
    const geoLatency = Math.random() * (distance.max - distance.min) + distance.min;
    
    console.log(`🌍 Geographic latency ${region1} → ${region2}: ${Math.round(geoLatency)}ms`);
    
    return Math.round(geoLatency);
  }

  /**
   * Create latency monitoring report
   */
  generateLatencyReport(circuits) {
    console.log('📈 Generating latency report...');
    
    const report = {
      timestamp: new Date(),
      networkCondition: this.currentCondition,
      circuits: [],
      summary: {
        averageLatency: 0,
        minLatency: Infinity,
        maxLatency: 0,
        totalCircuits: circuits.length
      }
    };
    
    let totalLatency = 0;
    
    for (const circuit of circuits) {
      const latencyData = this.calculateCircuitLatency(circuit);
      
      report.circuits.push({
        circuitId: circuit.id,
        ...latencyData
      });
      
      totalLatency += latencyData.total;
      report.summary.minLatency = Math.min(report.summary.minLatency, latencyData.total);
      report.summary.maxLatency = Math.max(report.summary.maxLatency, latencyData.total);
    }
    
    report.summary.averageLatency = Math.round(totalLatency / circuits.length) || 0;
    report.summary.minLatency = report.summary.minLatency === Infinity ? 0 : report.summary.minLatency;
    
    console.log(`📊 Latency Report:`);
    console.log(`   Average: ${report.summary.averageLatency}ms`);
    console.log(`   Range: ${report.summary.minLatency}ms - ${report.summary.maxLatency}ms`);
    console.log(`   Condition: ${this.currentCondition}`);
    
    return report;
  }
}

export default LatencySimulator;
