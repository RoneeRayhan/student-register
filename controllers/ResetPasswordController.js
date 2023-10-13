const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const StudentsModel = require("../models/StudentsModel");

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await StudentsModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a unique reset token and store it in the database
  const resetToken = jwt.sign({ email: user.email }, "your-secret-key", {
    expiresIn: "1h",
  });

  // Send an email with the reset link
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const resetLink = `http://your-frontend-url/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: user.email,
    subject: "Password Reset Request",
    text: `Click the link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send reset email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Reset email sent successfully" });
    }
  });
};
