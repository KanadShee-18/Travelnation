const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// Sent Otp Controller:
exports.sendOtp = async (req, res) => {
  try {
    console.log("Request comes to backend .....");

    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User is already registered. Please log in.",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpResult = await OTP.findOne({ otp: otp });
    // console.log("Otp Result: ", otpResult);
    while (otpResult) {
      otpResult = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // console.log("Final generated otp: ", otpBody);

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully to ${email}`,
      otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred while generating the otp.",
      error: error.message,
    });
  }
};

// SignUp Controller:

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, accountType, otp } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      accountType,
      password: hashedPassword,
      accountType: accountType,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while sign up. Please try again.",
      error: error.message,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to sign in.",
        error: error.message,
      });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, findUser.password)) {
      const token = jwt.sign(
        {
          email: findUser.email,
          id: findUser._id,
          accountType: findUser.accountType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      findUser.token = token;
      findUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        findUser,
        message: `User have logged in successfully.`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while log in. Please try again.",
      error: error.message,
    });
  }
};

// Change Password:
exports.changePassword = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please provide the user id to update the password.",
      });
    }

    const userDetails = await User.findById(userId);
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res.status(401).json({
        success: false,
        message: "Previous password is not correct. Please re-check it.",
      });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Updated Email - from Wanderlust",
        passwordUpdated(
          updatedUserDetails.email,
          `Passoword updated successfully for ${updatedUserDetails.name}`
        )
      );
      // console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Password has been updated successfully.",
      updated_data: {
        user: updatedUserDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// Add listing as wishlist:
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { listingId } = req.body;

    // Search user:
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized.",
      });
    }
    let isLisitngWishlisted;
    if (user) {
      isLisitngWishlisted = user.wishLists.includes(listingId);

      if (isLisitngWishlisted) {
        user.wishLists.pull(listingId);
      } else {
        user.wishLists.push(listingId);
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Listing has been added to your wishlist",
      wishListed: !isLisitngWishlisted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred to add this listing to wishlist.",
      error: error.message,
    });
  }
};

exports.allWishListedData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("wishLists").exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    user.password = undefined;
    user.token = undefined;

    return res.status(200).json({
      success: true,
      messgae: "User wishlists have been fetched successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while fetching all wishlisted listings.",
      error: error.message,
    });
  }
};
