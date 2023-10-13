const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const worksSchema = new Schema({
  title: String,
  classNote: String,
  description: String,
  status: String,
  email: String,
});

const WorksModel = mongoose.model("Works", worksSchema);

module.exports = WorksModel;
