const mongoose = require('mongoose');

const CepPatternRuleSchema = new mongoose.Schema({
  ruleId: {
    type: String,
    required: true,
    unique: true
  },
  ruleName: {
    type: String,
    required: true
  },
  eventSequence: [{
    eventType: { type: String, required: true },
    condition: { type: String }
  }],
  timeWindowMs: {
    type: Number,
    default: 60000 // 60s
  },
  severity: {
    type: String,
    enum: ['INFO', 'WARNING', 'CRITICAL'],
    default: 'WARNING'
  },
  action: {
    type: String,
    enum: ['ALERT', 'BLOCK', 'NOTIFY'],
    default: 'ALERT'
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CepPatternRule', CepPatternRuleSchema);
