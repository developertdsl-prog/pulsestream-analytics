const mongoose = require('mongoose');

const WindowAggregationResultSchema = new mongoose.Schema({
  windowId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  pipelineId: {
    type: String,
    required: true,
    index: true
  },
  windowStart: {
    type: Date,
    required: true
  },
  windowEnd: {
    type: Date,
    required: true
  },
  recordCount: {
    type: Number,
    default: 0
  },
  metrics: {
    sum: { type: Number, default: 0 },
    avg: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    p99: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['INTERMEDIATE', 'FINALIZED'],
    default: 'FINALIZED'
  },
  finalizedAt: {
    type: Date,
    default: Date.now
  }
});

WindowAggregationResultSchema.index({ pipelineId: 1, windowStart: -1 });

module.exports = mongoose.model('WindowAggregationResult', WindowAggregationResultSchema);
