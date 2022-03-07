const CepPatternRule = require('../models/CepPatternRule');

exports.getAllRules = async (req, res, next) => {
  try {
    const rules = await CepPatternRule.find().sort({ createdAt: -1 });
    res.json({ success: true, count: rules.length, data: rules });
  } catch (err) {
    next(err);
  }
};

exports.createRule = async (req, res, next) => {
  try {
    const rule = await CepPatternRule.create(req.body);
    res.status(201).json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
};
