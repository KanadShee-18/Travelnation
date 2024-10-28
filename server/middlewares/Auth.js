const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// Auth:

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded value: ", decode);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Provide a valid token.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while verifying the token.",
      error: error.message,
    });
  }
};

// Is Admin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Is Owner

exports.isOwner = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Owner") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for owner only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Is Visitor

exports.isViewer = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Visitor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Visitors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
