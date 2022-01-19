const mongoose = require('mongoose');
const { WINDOW_TYPES, STREAM_STATUS } = require('../config/streamConstants');

const StreamPipelineSchema = new mongoose.Schema({
  pipelineId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  sourceTopic: {
    type: String,
    required: true
  },
  windowType: {
    type: String,
    enum: Object.values(WINDOW_TYPES),
    default: WINDOW_TYPES.TUMBLING
  },
  windowSizeMs: {
    type: Number,
    default: 60000 // 1 minute
  },
  slideIntervalMs: {
    type: Number,
    default: 15000 // 15 seconds (for sliding windows)
  },
  watermarkDelayMs: {
    type: Number,
    default: 3000
  },
  aggregationField: {
    type: String,
    default: 'value'
  },
  status: {
    type: String,
    enum: Object.values(STREAM_STATUS),
    default: STREAM_STATUS.ACTIVE
  },
  totalEventsProcessed: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StreamPipeline', StreamPipelineSchema);
