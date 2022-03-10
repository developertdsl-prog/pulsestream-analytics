const express = require('express');
const router = express.Router();
const analyticsCtrl = require('../controllers/analyticsController');

router.get('/summary', analyticsCtrl.getStreamSummary);
router.get('/windows', analyticsCtrl.getFinalizedWindows);

module.exports = router;
