const StreamPipeline = require('../models/StreamPipeline');
const WindowAggregationResult = require('../models/WindowAggregationResult');
const DeadLetterEvent = require('../models/DeadLetterEvent');
const StreamMetricsCalculator = require('../services/streamMetricsCalculator');
const { memoryStreamBuffer } = require('../services/streamBufferManager');
const { globalWatermarkManager } = require('../services/watermarkManager');

exports.getStreamSummary = async (req, res, next) => {
  try {
    const [pipelineCount, windowCount, dlqCount] = await Promise.all([
      StreamPipeline.countDocuments({ status: 'ACTIVE' }),
      WindowAggregationResult.countDocuments(),
      DeadLetterEvent.countDocuments()
    ]);

    const metrics = StreamMetricsCalculator.getMetrics();
    const watermark = globalWatermarkManager.getWatermark();

    res.json({
      success: true,
      data: {
        activePipelines: pipelineCount,
        finalizedWindowsTotal: windowCount,
        deadLetterEventsCount: dlqCount,
        currentWatermark: new Date(watermark).toISOString(),
        bufferedEventsCount: memoryStreamBuffer.getStats().currentBufferSize,
        ...metrics
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getFinalizedWindows = async (req, res, next) => {
  try {
    const windows = await WindowAggregationResult.find().sort({ windowStart: -1 }).limit(20);
    res.json({ success: true, count: windows.length, data: windows });
  } catch (err) {
    next(err);
  }
};
