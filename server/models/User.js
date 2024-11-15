const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Owner", "Visitor"],
    required: true,
  },
  bookedStays: [
    {
      listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
      status: {
        type: String,
        enum: ["requested", "booked"],
        required: true,
      },
    },
  ],
  bookingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  wishLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
