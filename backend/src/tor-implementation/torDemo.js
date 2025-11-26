import RoutingEngine from './routingEngine.js';
import LatencySimulator from './latencySimulator.js';
import { TorConfig, validateConfig, printConfig } from './torConfig.js';

/**
 * TorDemo - Demonstrates the Tor implementation without affecting the main chat system
 * This is completely isolated and only shows how the Tor network would work
 */
export class TorDemo {
  constructor() {
    this.routingEngine = null;
    this.latencySimulator = null;
    this.isRunning = false;
    
    console.log('🎭 TorDemo initialized - Educational demonstration only');
    console.log('📝 This does not affect the main chat application');
  }

  /**
   * Start the Tor demo
   */
  async startDemo() {
    if (this.isRunning) {
      console.log('⚠️  Demo already running');
      return;
    }

    console.log('');
    console.log('='.repeat(80));
    console.log('🎯 STARTING TOR NETWORK DEMONSTRATION');
    console.log('='.repeat(80));
    console.log('');

    // Validate and print configuration
    if (!validateConfig()) {
      console.log('❌ Configuration validation failed');
      return;
    }

    printConfig();
    console.log('');

    // Initialize components
    console.log('🚀 Initializing Tor components...');
    
    this.latencySimulator = new LatencySimulator();
    this.routingEngine = new RoutingEngine();
    
    this.isRunning = true;
    
    console.log('');
    console.log('✅ Tor network demonstration is ready!');
    console.log('');

    // Run some demo scenarios
    await this.runDemoScenarios();
  }

  /**
   * Run demonstration scenarios
   */
  async runDemoScenarios() {
    console.log('🎪 Running demonstration scenarios...');
    console.log('');

    // Scenario 1: Send a simple message
    await this.demoMessageRouting();
    
    // Scenario 2: Show network statistics
    await this.demoNetworkStats();
    
    // Scenario 3: Demonstrate different network conditions
    await this.demoNetworkConditions();
    
    console.log('');
    console.log('🎉 Demonstration complete!');
    console.log('💡 This shows how messages would route through a Tor-like network');
    console.log('📚 Educational purposes only - not connected to actual chat');
  }

  /**
   * Demo message routing
   */
  async demoMessageRouting() {
    console.log('📨 Scenario 1: Message Routing Demonstration');
    console.log('-'.repeat(50));

    const demoMessages = [
      { text: "Hello, this is a test message through Tor!", sender: "Alice", receiver: "Bob" },
      { text: "Anonymous messaging demonstration", sender: "User1", receiver: "User2" },
      { text: "Educational Tor simulation", sender: "Student", receiver: "Teacher" }
    ];

    for (let i = 0; i < demoMessages.length; i++) {
      console.log(`\n📧 Message ${i + 1}:`);
      const result = await this.routingEngine.routeMessage(demoMessages[i]);
      
      if (result.success) {
        console.log(`✅ Delivered in ${result.latency}ms via ${result.hops} hops`);
      } else {
        console.log(`❌ Failed: ${result.error}`);
      }
      
      // Wait between messages for demonstration
      await this.sleep(1000);
    }
  }

  /**
   * Demo network statistics
   */
  async demoNetworkStats() {
    console.log('\n📊 Scenario 2: Network Statistics');
    console.log('-'.repeat(50));

    const stats = this.routingEngine.getNetworkStatus();
    
    console.log(`🌐 Network Overview:`);
    console.log(`   Total nodes: ${stats.nodes.total}`);
    console.log(`   Active nodes: ${stats.nodes.active}`);
    console.log(`   Entry nodes: ${stats.nodes.byType.entry}`);
    console.log(`   Middle nodes: ${stats.nodes.byType.middle}`);
    console.log(`   Exit nodes: ${stats.nodes.byType.exit}`);
    console.log(`   Active circuits: ${stats.circuits.active}`);
    
    console.log(`\n📈 Performance Metrics:`);
    console.log(`   Messages routed: ${stats.performance.messagesRouted}`);
    console.log(`   Average latency: ${Math.round(stats.performance.averageLatency)}ms`);
    console.log(`   Success rate: ${Math.round((1 - stats.performance.failureRate) * 100)}%`);
  }

  /**
   * Demo different network conditions
   */
  async demoNetworkConditions() {
    console.log('\n🌐 Scenario 3: Network Conditions Impact');
    console.log('-'.repeat(50));

    const conditions = ['excellent', 'good', 'fair', 'poor'];
    const testMessage = { text: "Network condition test", sender: "System", receiver: "Test" };

    for (const condition of conditions) {
      console.log(`\n🔧 Testing '${condition}' network conditions:`);
      
      this.latencySimulator.setNetworkCondition(condition);
      
      const result = await this.routingEngine.routeMessage(testMessage);
      
      if (result.success) {
        console.log(`   Latency: ${result.latency}ms`);
      } else {
        console.log(`   Failed: ${result.error}`);
      }
    }
    
    // Reset to good conditions
    this.latencySimulator.setNetworkCondition('good');
  }

  /**
   * Stop the demo
   */
  stopDemo() {
    if (!this.isRunning) {
      console.log('⚠️  Demo not running');
      return;
    }

    console.log('🛑 Stopping Tor demonstration...');
    this.isRunning = false;
    console.log('✅ Demo stopped');
  }

  /**
   * Get demo status
   */
  getStatus() {
    return {
      running: this.isRunning,
      components: {
        routingEngine: !!this.routingEngine,
        latencySimulator: !!this.latencySimulator
      },
      message: this.isRunning ? 'Demo is running' : 'Demo is stopped'
    };
  }

  /**
   * Simple sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Quick demo function for testing
 */
export async function runQuickDemo() {
  console.log('🚀 Running quick Tor demonstration...');
  
  const demo = new TorDemo();
  await demo.startDemo();
  
  return demo;
}

export default TorDemo;
