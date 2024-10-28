const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Reset-password token:

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message:
          "Please provide an authentic email. This email is not registered with us.",
      });
    }

    // Generating token
    const token = crypto.randomBytes(20).toString("hex");
    // Updating user by adding token and expire time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:5173/update-password/${token}`;

    // Send mail containing the url
    await mailSender(
      email,
      "Password Reset Link - from WanderLust",
      `Click on this link to reset your password. Password Reset Link: ${url}.`
    );

    res.status(200).json({
      success: true,
      message: `Email sent successfully to reset the password. Please check you email: ${email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while generating the reset-password-token.",
      error: error.message,
    });
  }
};

// Reset Password:
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword, token } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords should be matched. Please re-check them.",
      });
    }

    // get user
    const userDetails = await User.findOne({
      token: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Token has been expired or invalid token.",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    const updatedUser = await User.findOneAndUpdate(
      { token: token },
      { password: newHashedPassword },
      { new: true }
    );

    await mailSender(
      userDetails.email,
      "Password Reset Link - from WanderLust",
      passwordUpdated(userDetails.email, userDetails.name)
    );

    res.status(200).json({
      success: true,
      message: `Password has been reset successfully for ${updatedUser.name}.`,
      updated_data: {
        user: {
          user_details: updatedUser,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Some error occurred while resetting the password. Please try again.",
      error: error.message,
    });
  }
};
