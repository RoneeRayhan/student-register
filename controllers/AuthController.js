const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });
};

// User login and token generation
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const student = await StudentsModel.findOne({ email });

  if (!student) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, student.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email: student.email }, "your-secret-key", {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
};
