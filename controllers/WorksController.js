const WorksModel = require("../models/WorksModel");

// Create a work
exports.createWork = async (req, res) => {
  try {
    const work = new WorksModel(req.body);
    await work.save();
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all works
exports.getAllWorks = async (req, res) => {
  const works = await WorksModel.find();
  res.status(200).json(works);
};

// Update a work
exports.updateWork = async (req, res) => {
  try {
    const work = await WorksModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(work);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a work
exports.deleteWork = async (req, res) => {
  await WorksModel.findByIdAndRemove(req.params.id);
  res.status(204).end();
};
