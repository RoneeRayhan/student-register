const StudentsModel = require("../models/StudentsModel");

// Create a student
exports.createStudent = async (req, res) => {
  try {
    const student = new StudentsModel(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  const students = await StudentsModel.find();
  res.status(200).json(students);
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await StudentsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  await StudentsModel.findByIdAndRemove(req.params.id);
  res.status(204).end();
};
