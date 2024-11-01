const express = require("express");
const router = express.Router();

// Auth Controllers
const {
  sendOtp,
  signUp,
  logIn,
  changePassword,
  addToWishlist,
  allWishListedData,
} = require("../controllers/Auth");

// Reset Password Controllers
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Auth Middleware
const { auth, isViewer } = require("../middlewares/Auth");

// Authentication Routes:

router.post("/sendOtp", sendOtp);
router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/changePassword", auth, changePassword);

// Reset Password Routes:
router.post("/reset-password-token", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.post("/addToWishlist", auth, addToWishlist);
router.post("/wishlistedItems", auth, allWishListedData);

module.exports = router;
