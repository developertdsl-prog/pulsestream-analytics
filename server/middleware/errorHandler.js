const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`PulseStream Exception [${req.method} ${req.url}]: ${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Stream Analytics Engine Exception',
    code: err.code || 'ERR_PULSESTREAM_ENGINE_FAULT',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
