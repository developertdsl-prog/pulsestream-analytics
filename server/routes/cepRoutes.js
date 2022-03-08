const express = require('express');
const router = express.Router();
const cepCtrl = require('../controllers/cepController');

router.get('/rules', cepCtrl.getAllRules);
router.post('/rules', cepCtrl.createRule);

module.exports = router;
