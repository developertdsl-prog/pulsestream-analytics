const mongoose = require('mongoose');

const DeadLetterEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true
  },
  pipelineId: {
    type: String,
    required: true
  },
  originalPayload: {
    type: mongoose.Schema.Types.Mixed
  },
  reason: {
    type: String,
    enum: ['LATE_ARRIVING_EVENT', 'SCHEMA_VALIDATION_ERROR', 'BUFFER_OVERFLOW'],
    required: true
  },
  eventTimestamp: {
    type: Date
  },
  watermarkTimestamp: {
    type: Date
  },
  droppedAt: {
    type: Date,
    default: Date.now
  }
});

DeadLetterEventSchema.index({ pipelineId: 1, droppedAt: -1 });

module.exports = mongoose.model('DeadLetterEvent', DeadLetterEventSchema);
