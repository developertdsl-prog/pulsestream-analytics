const WindowAggregationResult = require('../models/WindowAggregationResult');
const { WINDOW_TYPES } = require('../config/streamConstants');
const logger = require('../utils/logger');

class WindowAggregator {
  /**
   * Calculates metric aggregations across an array of numeric values.
   */
  static computeMetrics(values) {
    if (!values || values.length === 0) {
      return { count: 0, sum: 0, avg: 0, min: 0, max: 0, p99: 0 };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const count = sorted.length;
    const sum = sorted.reduce((acc, v) => acc + v, 0);
    const avg = parseFloat((sum / count).toFixed(2));
    const min = sorted[0];
    const max = sorted[count - 1];
    const p99Index = Math.min(count - 1, Math.floor(count * 0.99));
    const p99 = sorted[p99Index];

    return { count, sum, avg, min, max, p99 };
  }

  /**
   * Buckets events into Tumbling Windows and computes reductions.
   */
  static processTumblingWindow(pipeline, events, windowStartTime, windowEndTime) {
    const windowEvents = events.filter(e => {
      const t = new Date(e.eventTimestamp).getTime();
      return t >= windowStartTime && t < windowEndTime;
    });

    const values = windowEvents.map(e => {
      const field = pipeline.aggregationField || 'value';
      return typeof e.payload[field] === 'number' ? e.payload[field] : 1;
    });

    const metrics = this.computeMetrics(values);
    const windowId = `WIN-${pipeline.pipelineId}-${windowStartTime}`;

    return {
      windowId,
      pipelineId: pipeline.pipelineId,
      windowStart: new Date(windowStartTime),
      windowEnd: new Date(windowEndTime),
      recordCount: windowEvents.length,
      metrics,
      status: 'FINALIZED'
    };
  }

  /**
   * Evaluates Sliding Windows with a fixed hop interval.
   */
  static processSlidingWindows(pipeline, events, currentTime) {
    const size = pipeline.windowSizeMs || 60000;
    const slide = pipeline.slideIntervalMs || 15000;
    const results = [];

    // Evaluate last 3 overlapping windows
    for (let offset = 0; offset < size; offset += slide) {
      const windowEnd = currentTime - offset;
      const windowStart = windowEnd - size;
      const winResult = this.processTumblingWindow(pipeline, events, windowStart, windowEnd);
      results.push(winResult);
    }

    return results;
  }
}

module.exports = WindowAggregator;
