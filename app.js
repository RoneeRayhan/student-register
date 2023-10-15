const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

//
// mongodb+srv://<username>:<password>@cluster0.nmv0r0r.mongodb.net/
// mongodb+srv://<username>:<password>@cluster0.nmv0r0r.mongodb.net/
// mongoose.connect("mongodb://localhost/student_register_db", {
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nmv0r0r.mongodb.net/`,
  {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
  }
);

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
