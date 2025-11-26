export default {
  // GLOBAL IDS SWITCH
  IDS_ENABLED: true,

  // RULE ENGINE SETTINGS
  RULES: {
    ENABLED: true,
    OVERSIZED_PACKET_LIMIT: 1 * 1024 * 1024,  // 1 MB
    MAX_IMAGES_PER_MINUTE: 5,
    RATE_LIMIT_MESSAGES_PER_SEC: 10
  },

  // ANOMALY DETECTOR SETTINGS
  ANOMALY: {
    ENABLED: true,
    MODEL_CONFIDENCE_THRESHOLD: 0.3,   // Below this = anomaly
    TRAINING_DATA_SIZE: 1000,          // Number of normal samples to train baseline
    RETRAIN_INTERVAL_MIN: 30           // Retrain every 30 minutes
  },

  // PACKET VALIDATION
  PACKET: {
    REQUIRE_VALID_JSON: true,
    DETECT_NULL_BYTES: true,
    DETECT_NON_UTF8: true
  },

  // LOGGING BEHAVIOR
  LOGGING: {
    LOG_PACKETS: true,         // Save packet logs (packetLog.model.js)
    LOG_EVENTS: true,          // Save IDS events (idsEvent.model.js)
    EMIT_EVENTS_TO_FRONTEND: true // Send alerts to visualization dashboard
  },

  // ACTION HANDLER SETTINGS
  ACTION: {
    FLAG_THRESHOLD: 50,      // riskScore >= 50 → FLAG
    BLOCK_THRESHOLD: 80,     // riskScore >= 80 → BLOCK
  }
};