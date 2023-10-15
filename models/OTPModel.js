const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0 for unused, 1 for used, for example
  createdAt: { type: Date, default: Date.now },
});

const OTPModel = mongoose.model("OTP", otpSchema);

module.exports = OTPModel;

// // models/OTPModel.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const otpSchema = new Schema({
//   email: { type: String, required: true },
//   otp: { type: String, required: true },
//   status: { type: Number, default: 0 }, // Status can be used to track if the OTP is used or not
//   createdAt: { type: Date, default: Date.now },
// });

// const OTPModel = mongoose.model("OTP", otpSchema);

// module.exports = OTPModel;
