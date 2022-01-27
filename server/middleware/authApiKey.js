const authApiKey = (req, res, next) => {
  const apiKey = req.headers['x-stream-key'] || req.headers['x-api-key'] || req.query.api_key;
  const expectedKey = process.env.STREAM_API_KEY || 'pulsestream_sec_token_9942';

  if (process.env.NODE_ENV === 'test' || req.path === '/api/v1/ping') {
    return next();
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      error: 'PulseStream Security Error: Unauthorized access. Invalid x-stream-key header.'
    });
  }

  next();
};

module.exports = authApiKey;
