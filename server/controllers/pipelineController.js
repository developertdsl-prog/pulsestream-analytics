const StreamPipeline = require('../models/StreamPipeline');

exports.getAllPipelines = async (req, res, next) => {
  try {
    const pipelines = await StreamPipeline.find().sort({ createdAt: -1 });
    res.json({ success: true, count: pipelines.length, data: pipelines });
  } catch (err) {
    next(err);
  }
};

exports.createPipeline = async (req, res, next) => {
  try {
    const pipeline = await StreamPipeline.create(req.body);
    res.status(201).json({ success: true, data: pipeline });
  } catch (err) {
    next(err);
  }
};

exports.getPipelineById = async (req, res, next) => {
  try {
    const pipeline = await StreamPipeline.findOne({ pipelineId: req.params.id });
    if (!pipeline) {
      return res.status(404).json({ success: false, error: 'Stream pipeline not found' });
    }
    res.json({ success: true, data: pipeline });
  } catch (err) {
    next(err);
  }
};
