const { StreamBufferManager } = require('../services/streamBufferManager');

describe('StreamBufferManager Ring Buffer Test Suite', () => {
  test('Enqueues events up to max capacity', () => {
    const buffer = new StreamBufferManager(5);
    for (let i = 0; i < 5; i++) {
      buffer.push({ id: i });
    }
    expect(buffer.getStats().currentBufferSize).toBe(5);
  });

  test('Drops oldest event when capacity overflows', () => {
    const buffer = new StreamBufferManager(3);
    buffer.push({ id: 1 });
    buffer.push({ id: 2 });
    buffer.push({ id: 3 });
    buffer.push({ id: 4 }); // Overflows

    expect(buffer.getStats().currentBufferSize).toBe(3);
    expect(buffer.getStats().totalDroppedCount).toBe(1);
  });
});
