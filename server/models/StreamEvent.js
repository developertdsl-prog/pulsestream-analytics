const mongoose = require('mongoose');

const StreamEventSchema = new mongoose.Schema({
  eventId: {
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
  eventTimestamp: {
    type: Date,
    required: true,
    index: true
  },
  ingestedAt: {
    type: Date,
    default: Date.now
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  partitionKey: {
    type: String,
    default: 'default'
  }
});

StreamEventSchema.index({ pipelineId: 1, eventTimestamp: -1 });

module.exports = mongoose.model('StreamEvent', StreamEventSchema);
