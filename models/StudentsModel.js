const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  mobile: String,
  password: String,
  address: String,
  roll: String,
  class: String,
});

const StudentsModel = mongoose.model("Students", studentsSchema);

module.exports = StudentsModel;
