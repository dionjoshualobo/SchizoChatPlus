import pkg from 'synaptic';
const { Layer, Network } = pkg;

let model = null;

/**
 * Build and train the model on normal traffic data
 * @param {Array} trainingData - Array of normal packet feature objects
 */
export function trainModel(trainingData = []) {
  if (!trainingData.length) {
    console.warn('No training data provided for anomaly detector.');
    return;
  }

  // Create a simple 3-layer neural network
  const inputLayer = new Layer(4);
  const hiddenLayer = new Layer(6);
  const outputLayer = new Layer(1);

  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  const net = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });

  // Training loop
  for (let epoch = 0; epoch < 2000; epoch++) {
    trainingData.forEach(data => {
      const input = Object.values(extractFeatures(data));
      net.activate(input);
      net.propagate(0.3, [1]); // 1 = "normal"
    });
  }

  model = net;
  console.log('Anomaly detection model trained successfully (Synaptic)');
}

/**
 * Detect anomaly based on trained model
 * @param {Object} packet
 * @returns {Object} { anomalyScore, isAnomalous, confidence }
 */
export function detectAnomaly(packet) {
  if (!model) {
    console.warn('Anomaly detection model not trained.');
    return { anomalyScore: 0, isAnomalous: false, confidence: 1 };
  }

  const input = Object.values(extractFeatures(packet));
  const output = model.activate(input)[0];
  const confidence = Number(output.toFixed(2));

  const isAnomalous = confidence < 0.3;
  const anomalyScore = isAnomalous ? (1 - confidence) * 100 : 0;

  return { anomalyScore, isAnomalous, confidence };
}

/**
 * Extract numerical features from packet for ML input
 */
export function extractFeatures(packet) {
  return {
    size: normalize(packet.size || 0, 0, 2000),
    payloadLength: normalize(packet.payload?.length || 0, 0, 2000),
    riskScore: normalize(packet.riskScore || 0, 0, 100),
    flagCount: normalize(packet.flags?.length || 0, 0, 10),
    actionSeverity: normalize(packet.action === 'block' ? 1 : 0, 0, 1) // New feature
  };
}

/**
 * Normalize a value between 0–1
 */
function normalize(value, min, max) {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Quick helper to just get score
 */
export function calculateAnomalyScore(packet) {
  const { anomalyScore } = detectAnomaly(packet);
  return anomalyScore;
}

/**
 * Update model with new normal traffic
 */
export function updateModel(newTrainingData) {
  if (!newTrainingData?.length) return;
  console.log('Retraining anomaly model with new data...');
  trainModel(newTrainingData);
}

export default {
  trainModel,
  detectAnomaly,
  extractFeatures,
  calculateAnomalyScore,
  updateModel
};
