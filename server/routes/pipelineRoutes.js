const express = require('express');
const router = express.Router();
const pipeCtrl = require('../controllers/pipelineController');

router.get('/', pipeCtrl.getAllPipelines);
router.post('/', pipeCtrl.createPipeline);
router.get('/:id', pipeCtrl.getPipelineById);

module.exports = router;
