const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const {authValidationObjGen,authDataValidation} = require("../../common/dataValidation/index");





// these paths starts with "/auth"

// /api/auth/send-otp
router.post("/send-otp",authDataValidation(),authValidationObjGen,authController.sendOTP);
// /api/auth/get-otp
router.post("/get-otp",authDataValidation(),authValidationObjGen,authController.checkOTP);
// ===================== // TEST Routes // =========================
// router.get("/get-token",authController.sendToken);







module.exports = router;