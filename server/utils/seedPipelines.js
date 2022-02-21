const mongoose = require('mongoose');
const StreamPipeline = require('../models/StreamPipeline');
const CepPatternRule = require('../models/CepPatternRule');
const WindowAggregationResult = require('../models/WindowAggregationResult');
const logger = require('./logger');

const pipelinesToSeed = [
  {
    pipelineId: 'pipe-clickstream-01',
    name: 'ClickstreamSessionAnalytics',
    sourceTopic: 'web-events-v1',
    windowType: 'SLIDING',
    windowSizeMs: 60000,
    slideIntervalMs: 15000,
    watermarkDelayMs: 3000,
    aggregationField: 'durationMs'
  },
  {
    pipelineId: 'pipe-fraud-02',
    name: 'FinancialFraudDetector',
    sourceTopic: 'payment-transactions',
    windowType: 'TUMBLING',
    windowSizeMs: 30000,
    watermarkDelayMs: 2000,
    aggregationField: 'amount'
  },
  {
    pipelineId: 'pipe-iot-telemetry-03',
    name: 'IoTTelemetryMonitor',
    sourceTopic: 'industrial-sensors',
    windowType: 'TUMBLING',
    windowSizeMs: 10000,
    watermarkDelayMs: 1000,
    aggregationField: 'temperature'
  }
];

const cepRulesToSeed = [
  {
    ruleId: 'cep-rule-brute-force',
    ruleName: 'BruteForceAuthenticationPattern',
    eventSequence: [
      { eventType: 'LOGIN_FAILED' },
      { eventType: 'LOGIN_FAILED' },
      { eventType: 'PASSWORD_RESET_ATTEMPT' }
    ],
    timeWindowMs: 45000,
    severity: 'CRITICAL',
    action: 'BLOCK'
  },
  {
    ruleId: 'cep-rule-high-velocity-spend',
    ruleName: 'HighVelocityTransactionAnomaly',
    eventSequence: [
      { eventType: 'CARD_PIN_CHANGE' },
      { eventType: 'LARGE_FUNDS_TRANSFER' }
    ],
    timeWindowMs: 120000,
    severity: 'WARNING',
    action: 'ALERT'
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pulsestream_analytics';
  await mongoose.connect(uri);
  logger.info('Connected to MongoDB for seeding PulseStream pipelines...');

  for (const p of pipelinesToSeed) {
    await StreamPipeline.findOneAndUpdate({ pipelineId: p.pipelineId }, p, { upsert: true, new: true });
    logger.info(`Seeded Pipeline: ${p.name} (${p.windowType} Window)`);
  }

  for (const r of cepRulesToSeed) {
    await CepPatternRule.findOneAndUpdate({ ruleId: r.ruleId }, r, { upsert: true, new: true });
    logger.info(`Seeded CEP Rule: ${r.ruleName}`);
  }

  // Seed initial finalized window result
  const now = Date.now();
  await WindowAggregationResult.findOneAndUpdate({ windowId: 'WIN-INIT-001' }, {
    windowId: 'WIN-INIT-001',
    pipelineId: 'pipe-clickstream-01',
    windowStart: new Date(now - 60000),
    windowEnd: new Date(now),
    recordCount: 2450,
    metrics: { sum: 342100, avg: 139.63, min: 12, max: 890, p99: 412 },
    status: 'FINALIZED'
  }, { upsert: true });

  logger.info('PulseStream seeding finished successfully.');
  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch(err => {
    logger.error(`Seed error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = seed;
