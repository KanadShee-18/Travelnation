const Category = require("../models/Category");
const Listing = require("../models/Listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

const User = require("../models/User");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/imageUploader");

// Get all listing handler
exports.getAllListings = async (req, res) => {
  try {
    const allListings = await Listing.find({});

    return res.status(200).json({
      success: true,
      message: "All listings fetched successfully.",
      listingsData: {
        data: allListings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting all listings.",
      error: error.message,
    });
  }
};

exports.userSpecificListings = async (req, res) => {
  try {
    const userId = req.user.id;

    const userSpecificListings = await Listing.find({
      owner: userId,
    });

    if (!userSpecificListings) {
      return res.status(404).json({
        success: false,
        message: "No listings found for this owner.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listings has been fetched successfully.",
      listings: userSpecificListings,
    });
  } catch (error) {
    console.log("User specific listing error: ", error);
    return res.status(500).json({
      success: false,
      message: "Your own listings has been fetched successfully.",
      error: error.message,
    });
  }
};

// Get each listing by id:

exports.getEachLising = async (req, res) => {
  try {
    let { listingId } = req.body;

    const listing = await Listing.findById(listingId).populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `No listing found with the listing id: ${listingId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Listing has been found with the listing id: ${listingId}`,
      listing_details: {
        data: listing,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Some error occurred to get the listing details.`,
      error: error.message,
    });
  }
};

// Create New Listing:

exports.createNewListing = async (req, res) => {
  try {
    const { title, description, price, location, country, categoryId } =
      req.body;

    console.log("Req coming in backend as: ", req.body);

    const userId = req.user.id;
    // const { userId } = req.body;

    const images = req.imagesArray;

    if (!images) {
      return res.status(400).json({
        success: false,
        message: "Please upload some images while creating your first listing.",
      });
    }

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !country ||
      !categoryId ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "This is not a valid category.",
      });
    }

    // if (!Array.isArray(images)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Images should be an array.",
    //   });
    // }

    let mapboxResponse = await geocodingClient
      .forwardGeocode({
        query: "Paris, France",
        limit: 1,
      })
      .send();

    const geometryRes = mapboxResponse.body.features[0].geometry;

    const uploadedImages = [];

    try {
      for (const image of images) {
        const result = await uploadImageToCloudinary(
          image,
          process.env.FOLDER_NAME,
          60
        );
        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Some error occurred while uploading images.",
        error: error.message,
      });
    }

    const createdListing = await Listing.create({
      title: title,
      description: description,
      image: uploadedImages,
      price: price,
      location: location,
      country: country,
      category: categoryDetails._id,
      owner: userId,
      geometry: geometryRes,
    });

    res.status(200).json({
      success: true,
      message: "New Listing has been created successfully.",
      listing_data: {
        newListingData: {
          data: createdListing,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating a new listing.",
      error: error.message,
    });
  }
};

// Update listing:

exports.updateListing = async (req, res) => {
  try {
    const { listingId } = req.body;
    const { userId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "No listing is found with this id.",
      });
    }

    if (listing.owner.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message:
          "To update this listing you must have to be the owner of this listing.",
      });
    }

    const { title, description, price, location, country, categoryId } =
      req.body;

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message:
          "This is not a valid category or the category id is not provided.",
      });
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (location) updateData.location = location;
    if (country) updateData.country = country;
    if (categoryId) updateData.category = categoryDetails._id;

    if (req.imagesArray) {
      const images = req.imagesArray;
      if (images) {
        if (!Array.isArray(images)) {
          return res.status(400).json({
            success: false,
            message: "Images should be an array.",
          });
        }

        const uploadedImages = [];

        try {
          for (const image of images) {
            const result = await uploadImageToCloudinary(
              image,
              process.env.FOLDER_NAME,
              60
            );
            uploadedImages.push({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Some error occurred while uploading images.",
            error: error.message,
          });
        }

        updateData.image = uploadedImages;
      }
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Listing has been updated successfully.",
      updated_listing: { data: updatedListing },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while updating the listing.",
      error: error.message,
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { listingId } = req.body;

    if (!listingId) {
      // Return to stop further execution after sending the response
      return res.status(400).json({
        success: false,
        message: `Please provide a listing id to destroy it.`,
      });
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
      // Return to stop further execution after sending the response
      return res.status(400).json({
        success: false,
        message: `No listing is available with this id: ${listingId}.`,
      });
    }

    // Delete images from Cloudinary if listing exists
    for (const image of listing.image) {
      const publicId = image.public_id;
      await deleteImageFromCloudinary(publicId);
    }

    // Delete the listing
    const deletedListing = await Listing.findByIdAndDelete(listingId);

    return res.status(200).json({
      success: true, // Update to true as the deletion is successful
      message: `Listing with id: ${listingId} has been deleted successfully by the owner.`,
      deleted_listing: {
        listing: deletedListing,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while deleting the listing.",
      error: error.message,
    });
  }
};
