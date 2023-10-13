const express = require("express");
const router = express.Router();
const ResetPasswordController = require("../controllers/ResetPasswordController");

router.post("/", ResetPasswordController.resetPassword);

module.exports = router;
