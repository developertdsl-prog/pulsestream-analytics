const streamIngestValidator = (req, res, next) => {
  const { pipelineId, payload } = req.body;

  if (!pipelineId) {
    return res.status(400).json({ success: false, error: 'Missing required field: pipelineId' });
  }

  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ success: false, error: 'Event payload must be a non-empty JSON object' });
  }

  // Ensure event timestamp exists or assign current time
  if (!req.body.eventTimestamp) {
    req.body.eventTimestamp = new Date();
  }

  next();
};

module.exports = streamIngestValidator;
