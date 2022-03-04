const express = require('express');
const router = express.Router();
const evCtrl = require('../controllers/eventController');
const streamIngestValidator = require('../middleware/streamIngestValidator');

router.post('/ingest', streamIngestValidator, evCtrl.ingestEvent);
router.post('/batch', evCtrl.batchIngest);

module.exports = router;
