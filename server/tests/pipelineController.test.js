const { STREAM_STATUS, WINDOW_TYPES } = require('../config/streamConstants');

describe('PipelineController Constants & Schema Test Suite', () => {
  test('Validates window types and stream status enumeration', () => {
    expect(WINDOW_TYPES.TUMBLING).toBe('TUMBLING');
    expect(WINDOW_TYPES.SLIDING).toBe('SLIDING');
    expect(STREAM_STATUS.ACTIVE).toBe('ACTIVE');
  });
});
