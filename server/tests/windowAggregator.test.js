const WindowAggregator = require('../services/windowAggregator');

describe('WindowAggregator Metric Reducer Test Suite', () => {
  test('Correctly computes sum, count, min, max, avg, and p99 metrics', () => {
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const metrics = WindowAggregator.computeMetrics(values);

    expect(metrics.count).toBe(10);
    expect(metrics.sum).toBe(550);
    expect(metrics.avg).toBe(55);
    expect(metrics.min).toBe(10);
    expect(metrics.max).toBe(100);
    expect(metrics.p99).toBe(100);
  });

  test('Gracefully handles empty array input with zero metrics', () => {
    const metrics = WindowAggregator.computeMetrics([]);
    expect(metrics.count).toBe(0);
    expect(metrics.sum).toBe(0);
  });
});
