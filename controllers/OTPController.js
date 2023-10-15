const OTPModel = require("../models/OTPModel");
const nodemailer = require("nodemailer");

// Generate and send OTP
exports.generateOTP = async (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save the OTP in the database
  const otpEntry = new OTPModel({ email, otp });
  await otpEntry.save();

  // Send the OTP via email
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP email" });
      } else {
        console.log("OTP Email sent: " + info.response);
        res.status(200).json({ message: "OTP Email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Find the OTP entry for the given email
  const otpEntry = await OTPModel.findOne({ email });

  if (!otpEntry) {
    return res.status(404).json({ message: "OTP not found for this email" });
  }

  if (otpEntry.status === 1) {
    return res.status(400).json({ message: "OTP has already been used" });
  }

  if (otpEntry.otp === otp) {
    // Mark the OTP as used
    otpEntry.status = 1;
    await otpEntry.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Incorrect OTP" });
  }
};
