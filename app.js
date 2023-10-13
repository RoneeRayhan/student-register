const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/student_register_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const studentsRoutes = require("./routes/students");
const worksRoutes = require("./routes/works");
const authRoutes = require("./routes/auth");
const resetPasswordRoutes = require("./routes/reset-password");

app.use("/students", studentsRoutes);
app.use("/works", worksRoutes);
app.use("/auth", authRoutes);
app.use("/reset-password", resetPasswordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
