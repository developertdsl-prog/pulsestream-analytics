const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const authApiKey = require('./middleware/authApiKey');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// REST API Route Imports
const pipelineRoutes = require('./routes/pipelineRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cepRoutes = require('./routes/cepRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
}

app.use(rateLimiter);

// System Health Checks
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'PulseStream-Analytics', timestamp: new Date().toISOString() });
});

app.get('/api/v1/ping', (req, res) => {
  res.json({
    status: 'OPTIMAL',
    platform: 'PulseStream-Analytics Real-Time Stream Engine',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Protected Stream Subsystems
app.use('/api/v1/pipelines', authApiKey, pipelineRoutes);
app.use('/api/v1/events', authApiKey, eventRoutes);
app.use('/api/v1/cep', authApiKey, cepRoutes);
app.use('/api/v1/analytics', authApiKey, analyticsRoutes);

app.use(errorHandler);

let server;
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    server = app.listen(PORT, () => {
      logger.info(`PulseStream Engine operational on port ${PORT} [Env: ${process.env.NODE_ENV || 'development'}]`);
    });
  });
}

module.exports = app;
