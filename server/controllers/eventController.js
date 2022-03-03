const { memoryStreamBuffer } = require('../services/streamBufferManager');
const { globalWatermarkManager } = require('../services/watermarkManager');
const WindowAggregator = require('../services/windowAggregator');
const CepPatternMatcher = require('../services/cepPatternMatcher');
const StreamPipeline = require('../models/StreamPipeline');
const StreamEvent = require('../models/StreamEvent');
const WindowAggregationResult = require('../models/WindowAggregationResult');

exports.ingestEvent = async (req, res, next) => {
  try {
    const { pipelineId, payload, eventTimestamp, partitionKey } = req.body;
    const eventId = `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const eventObj = {
      eventId,
      pipelineId,
      eventTimestamp: eventTimestamp || new Date(),
      payload,
      partitionKey: partitionKey || 'default'
    };

    // 1. Watermark & Late Arrival Inspection
    const watermarkResult = await globalWatermarkManager.validateEventArrival(pipelineId, eventObj);
    if (watermarkResult.isLate) {
      return res.status(202).json({
        success: false,
        message: 'Event dropped to Dead-Letter Queue (DLQ): Arrived past watermark threshold',
        watermark: watermarkResult.watermark
      });
    }

    // 2. Buffer in Memory
    memoryStreamBuffer.push(eventObj);

    // 3. Persist Event Asynchronously
    StreamEvent.create(eventObj).catch(() => {});

    // 4. Evaluate CEP Sequential Patterns
    const recent = memoryStreamBuffer.getRecent(50);
    const triggeredAlerts = await CepPatternMatcher.evaluatePatterns(pipelineId, recent);

    res.status(201).json({
      success: true,
      eventId,
      watermark: watermarkResult.watermark,
      triggeredAlertsCount: triggeredAlerts.length,
      alerts: triggeredAlerts
    });
  } catch (err) {
    next(err);
  }
};

exports.batchIngest = async (req, res, next) => {
  try {
    const { events } = req.body;
    if (!events || !Array.isArray(events)) {
      return res.status(400).json({ success: false, error: 'Array of events required' });
    }

    let accepted = 0;
    for (const ev of events) {
      memoryStreamBuffer.push({
        eventId: `EVT-${Date.now()}-${accepted}`,
        pipelineId: ev.pipelineId || 'default-pipe',
        eventTimestamp: ev.eventTimestamp || new Date(),
        payload: ev.payload || {}
      });
      accepted++;
    }

    res.status(201).json({ success: true, acceptedCount: accepted });
  } catch (err) {
    next(err);
  }
};
