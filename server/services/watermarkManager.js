const DeadLetterEvent = require('../models/DeadLetterEvent');
const logger = require('../utils/logger');

class WatermarkManager {
  constructor(delayMs = 3000) {
    this.delayMs = delayMs;
    this.currentMaxEventTime = 0;
  }

  /**
   * Updates highest observed event time and computes current watermark.
   * Watermark = max(eventTime) - delayMs
   */
  updateWatermark(eventTimestamp) {
    const t = new Date(eventTimestamp).getTime();
    if (t > this.currentMaxEventTime) {
      this.currentMaxEventTime = t;
    }
    return this.getWatermark();
  }

  getWatermark() {
    return Math.max(0, this.currentMaxEventTime - this.delayMs);
  }

  /**
   * Checks whether an arriving event is late relative to the current watermark.
   */
  async validateEventArrival(pipelineId, event) {
    const eventTime = new Date(event.eventTimestamp).getTime();
    const watermark = this.updateWatermark(event.eventTimestamp);

    if (eventTime < watermark) {
      logger.warn(`Late arriving event dropped to DLQ: [EventTime: ${new Date(eventTime).toISOString()} < Watermark: ${new Date(watermark).toISOString()}]`);

      await DeadLetterEvent.create({
        eventId: event.eventId || `DLQ-${Date.now()}`,
        pipelineId,
        originalPayload: event.payload,
        reason: 'LATE_ARRIVING_EVENT',
        eventTimestamp: new Date(eventTime),
        watermarkTimestamp: new Date(watermark)
      });

      return { isLate: true, watermark };
    }

    return { isLate: false, watermark };
  }
}

const globalWatermarkManager = new WatermarkManager(3000);

module.exports = {
  WatermarkManager,
  globalWatermarkManager
};
