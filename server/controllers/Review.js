const Review = require("../models/Review");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Get all reviews:
exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find({}).populate({
      path: "author",
      select: "name email",
    });

    return res.status(200).json({
      success: true,
      message: "All reviews have been fetched successfully",
      reviews_data: allReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Some error occurred while fetching all reviews. Please try again.",
      error: error.message,
    });
  }
};

// Create Review:
exports.createReview = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.user.id;

    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { rating, review, listingId } = req.body;

    if (!rating || !review || !listingId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const findListing = await Listing.findById(listingId).populate("reviews");
    if (!findListing) {
      return res.status(400).json({
        success: false,
        message: `No listing is found with this id ${listingId}`,
      });
    }

    const alreadyReviewed = await Review.findOne({ author: userId });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed for this listing",
      });
    }

    const createdReview = await Review.create({
      rating: rating,
      review: review,
      author: userId,
    });

    const updateListing = await Listing.findByIdAndUpdate(
      { _id: listingId },
      {
        $push: {
          reviews: createdReview._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: "name email",
        },
      })
      .exec();

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          reviews: createdReview._id,
        },
      },
      { new: true }
    ).populate({
      path: "reviews",
    });

    return res.status(200).json({
      success: true,
      message: `Review has been created successfully by ${checkUser.name}.`,
      review_details: {
        data: [
          {
            created_review: createdReview,
          },
          {
            listing_updated: updateListing,
          },
          {
            updated_user: updateUser,
          },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred to create the review.",
      error: error.message,
    });
  }
};

// Delete Review:

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId, userId, listingId } = req.body;
    if (!reviewId || !userId || !listingId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const findReview = await Review.findById(reviewId);
    const findUser = await User.findById(userId);
    const findListing = await Listing.findById(listingId);

    if (!findReview) {
      return res.status(404).json({
        success: false,
        message: `No review found with this id: ${reviewId}.`,
      });
    }
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: `No user found with this user id: ${userId}`,
      });
    }
    if (!findListing) {
      return res.status(404).json({
        success: false,
        message: `No listing found with this id: ${listingId}.`,
      });
    }
    // Convert userId to ObjectId for comparison
    if (findReview.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You have no permission to delete this review.",
      });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    const updatedListing = await Listing.findByIdAndUpdate(listingId, {
      $pull: {
        reviews: reviewId,
      },
    });
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: {
        reviews: reviewId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Review has been deleted successfully.",
      deleted_review: {
        data: [
          {
            deleted_review: deletedReview,
          },
          {
            updated_listing: updatedListing,
          },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while destroying the review.",
      error: error.message,
    });
  }
};

// Update or edit review:
exports.updateReview = async (req, res) => {
  try {
    const { reviewId, userId, rating, review } = req.body;
    if (!reviewId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const findReview = await Review.findById(reviewId);
    const findUser = await User.findById(userId);

    if (!findReview) {
      return res.status(404).json({
        success: false,
        message: `No review found with this id: ${reviewId}.`,
      });
    }
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: `No user found with this user id: ${userId}.`,
      });
    }
    // Convert userId to ObjectId for comparison
    if (findReview.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You have no permission to modify this review.",
      });
    }

    const updateFields = {};
    if (rating) updateFields.rating = rating;
    if (review) updateFields.review = review;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      updateFields,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: `Review has been successfully updated by ${findUser.name}.`,
      updated_review: {
        review: updatedReview,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while updating the review.",
      error: error.message,
    });
  }
};
