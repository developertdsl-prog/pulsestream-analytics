const streamIngestValidator = require('../middleware/streamIngestValidator');

describe('StreamIngestValidator Payload Guard Test Suite', () => {
  test('Rejects payload with missing pipelineId', () => {
    const req = { body: { payload: { value: 10 } } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    streamIngestValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
