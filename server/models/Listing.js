const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 1200,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  availability: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "requested", "booked"],
        default: "available",
      },
      requestedUser: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visitor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = mongoose.model("Listing", listingSchema);
