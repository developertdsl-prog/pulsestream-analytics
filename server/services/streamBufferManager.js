class StreamBufferManager {
  constructor(capacity = 100000) {
    this.capacity = capacity;
    this.buffer = [];
    this.totalIngested = 0;
    this.totalDropped = 0;
  }

  push(event) {
    if (this.buffer.length >= this.capacity) {
      // Ring buffer overflow -> drop oldest
      this.buffer.shift();
      this.totalDropped++;
    }
    this.buffer.push(event);
    this.totalIngested++;
  }

  getAll() {
    return this.buffer;
  }

  getRecent(limit = 100) {
    return this.buffer.slice(-limit);
  }

  clear() {
    this.buffer = [];
  }

  getStats() {
    return {
      currentBufferSize: this.buffer.length,
      maxCapacity: this.capacity,
      totalIngestedCount: this.totalIngested,
      totalDroppedCount: this.totalDropped
    };
  }
}

const memoryStreamBuffer = new StreamBufferManager(100000);

module.exports = {
  StreamBufferManager,
  memoryStreamBuffer
};
