const { WatermarkManager } = require('../services/watermarkManager');

describe('WatermarkManager Event-Time & Late Arrival Test Suite', () => {
  test('Advances monotonic watermark as higher event timestamps arrive', () => {
    const wm = new WatermarkManager(3000);
    const t1 = 1641800000000;
    const watermark = wm.updateWatermark(t1);

    expect(watermark).toBe(t1 - 3000);
  });

  test('Flags events arriving older than current watermark as late', async () => {
    const wm = new WatermarkManager(3000);
    const now = Date.now();
    wm.updateWatermark(now);

    const veryOldEvent = {
      eventId: 'EVT-OLD-1',
      eventTimestamp: new Date(now - 10000), // 10s old, exceeds 3s lag
      payload: { value: 42 }
    };

    const res = await wm.validateEventArrival('pipe-test', veryOldEvent);
    expect(res.isLate).toBe(true);
  });
});
