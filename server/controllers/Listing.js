const Category = require("../models/Category");
const Listing = require("../models/Listing");
const { mailSender } = require("../utils/mailSender");

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
    const { page = 1, limit = 5 } = req.query;
    const allListings = await Listing.find({})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalListings = await Listing.countDocuments();

    return res.status(200).json({
      success: true,
      message: "All listings fetched successfully.",
      listingsData: {
        data: allListings,
        totalPages: Math.ceil(totalListings / limit),
        currentPage: page,
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

    const listing = await Listing.findById(listingId)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: "name email",
        },
      })
      .populate({
        path: "owner",
        select: { name: 1 },
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

// exports.createNewListing = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       price,
//       location,
//       country,
//       categoryId,
//       availableDates,
//     } = req.body;

//     console.log("Req coming in backend as: ", req.body);

//     const userId = req.user.id;
//     // const { userId } = req.body;

//     const images = req.imagesArray;

//     if (!images) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload some images while creating your first listing.",
//       });
//     }

//     if (
//       !title ||
//       !description ||
//       !price ||
//       !location ||
//       !country ||
//       !categoryId ||
//       !userId ||
//       !availableDates
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required.",
//       });
//     }

//     const categoryDetails = await Category.findById(categoryId);
//     if (!categoryDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "This is not a valid category.",
//       });
//     }

//     let mapboxResponse = await geocodingClient
//       .forwardGeocode({
//         query: location,
//         limit: 1,
//       })
//       .send();

//     const geometryRes = mapboxResponse.body.features[0].geometry;

//     const uploadedImages = [];

//     try {
//       for (const image of images) {
//         const result = await uploadImageToCloudinary(
//           image,
//           process.env.FOLDER_NAME,
//           60
//         );
//         uploadedImages.push({
//           url: result.secure_url,
//           public_id: result.public_id,
//         });
//       }
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: "Some error occurred while uploading images.",
//         error: error.message,
//       });
//     }

//     const availableDatesArr = JSON.parse(availableDates);

//     const availability = [];
//     for (let i = 0; i < availableDatesArr.length; i += 2) {
//       if (availableDatesArr[i + 1]) {
//         availability.push({
//           startDate: new Date(availableDatesArr[i]),
//           endDate: new Date(availableDatesArr[i + 1]),
//         });
//       }
//     }

//     const createdListing = await Listing.create({
//       title: title,
//       description: description,
//       image: uploadedImages,
//       price: price,
//       location: location,
//       country: country,
//       category: categoryDetails._id,
//       owner: userId,
//       geometry: geometryRes,
//       availability: availability,
//     });

//     //Push the listing in its category
//     await Category.findByIdAndUpdate(categoryId, {
//       $push: {
//         listings: createdListing._id,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "New Listing has been created successfully.",
//       listing_data: {
//         newListingData: {
//           data: createdListing,
//         },
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred while creating a new listing.",
//       error: error.message,
//     });
//   }
// };

exports.createNewListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      country,
      categoryId,
      availableDates,
    } = req.body;

    console.log("Req coming in backend as: ", req.body);

    const userId = req.user.id;

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
      !userId ||
      !availableDates
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

    let mapboxResponse = await geocodingClient
      .forwardGeocode({
        query: location,
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

    // Parse the available dates range
    const availableDatesArr = JSON.parse(availableDates);
    const startDate = new Date(availableDatesArr[0]);
    const endDate = new Date(availableDatesArr[1]);

    const availability = [];

    // Loop through the date range and push each individual date
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      availability.push({
        date: new Date(currentDate),
        status: "available", // Initially set as available
        requestedDates: [],
      });
      currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
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
      availability: availability,
    });

    // Push the listing in its category
    await Category.findByIdAndUpdate(categoryId, {
      $push: {
        listings: createdListing._id,
      },
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
    console.log("Req body is : ", req.body);

    const userId = req.user.id;

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

    const {
      title,
      description,
      price,
      location,
      country,
      categoryId,
      availableDates,
    } = req.body;

    console.log("Category id in backend coming as: ", categoryId);

    let updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (location) updateData.location = location;
    if (country) updateData.country = country;
    if (categoryId) {
      const categoryDetails = await Category.findById(categoryId);
      if (!categoryDetails) {
        return res.status(400).json({
          success: false,
          message:
            "This is not a valid category or the category id is not provided.",
        });
      } else {
        updateData.category = categoryDetails._id;
      }
    }
    if (availableDates) {
      // Parse the available dates range
      const availableDatesArr = JSON.parse(availableDates);
      const startDate = new Date(availableDatesArr[0]);
      const endDate = new Date(availableDatesArr[1]);

      const availability = [];

      // Loop through the date range and push each individual date
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        availability.push({
          date: new Date(currentDate),
          status: "available", // Initially set as available
          requestedDates: [],
        });
        currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
      }

      updateData.availability = availability;
    }

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

    console.log("Listing has been updated from backend.", updatedListing);

    return res.status(200).json({
      success: true,
      message: "Listing has been updated successfully.",
      updated_listing: updatedListing,
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
    const { listingId, ownerId } = req.body;
    console.log("Listing and owner id: ", req.body);

    const owner = req.user.id;

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

    if (ownerId !== owner) {
      return res.status(401).json({
        success: false,
        message: "You are not the owner of this listing.",
      });
    }

    // Delete images from Cloudinary if listing exists
    for (const image of listing.image) {
      const publicId = image.public_id;
      await deleteImageFromCloudinary(publicId);
    }

    // Remove the listing also from its category.
    const categoryId = listing.category;
    await Category.findByIdAndUpdate(categoryId, {
      $pull: {
        listings: listing._id,
      },
    });

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

// exports.bookingRequest = async (req, res) => {
//   try {
//     const { listingId, bookingId, bookingStatus } = req.body;

//     // Check for required fields
//     if (!listingId || !bookingId || !bookingStatus) {
//       return res.status(401).json({
//         success: false,
//         message: "All fields are mandatory.",
//       });
//     }

//     const userId = req.user.id;

//     // Find the user and check their account type
//     const user = await User.findById(userId);
//     if (user.accountType !== "Visitor") {
//       return res.status(403).json({
//         success: false,
//         message: "You must be a visitor to book a listing.",
//       });
//     }

//     // Find the listing by ID
//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//       return res.status(404).json({
//         success: false,
//         message: "Listing not found.",
//       });
//     }

//     // Retrieve owner ID for updating booking requests
//     const owner = listing.owner;

//     // Find the specific booking in the availability array
//     const filteredBooking = listing.availability.find(
//       (item) => item._id.toString() === bookingId
//     );

//     if (!filteredBooking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found in the availability list.",
//       });
//     }

//     console.log("Requested booking is: ", filteredBooking);

//     // Update the booking status
//     filteredBooking.status = bookingStatus;
//     filteredBooking.requestedUser = userId;

//     // Add listing with 'requested' status to the visitor's bookedStays
//     await User.findByIdAndUpdate(userId, {
//       $push: {
//         bookedStays: {
//           listing: listingId,
//           status: "requested", // Store the status as 'requested'
//         },
//       },
//     });

//     // Handle booking requests based on the status
//     if (bookingStatus === "requested") {
//       await User.findByIdAndUpdate(owner, {
//         $addToSet: { bookingRequests: listing._id },
//       });
//     } else if (bookingStatus === "booked") {
//       await User.findByIdAndUpdate(owner, {
//         $pull: { bookingRequests: listing._id },
//       });
//     }

//     // Save the updated listing
//     await listing.save();

//     res.status(200).json({
//       success: true,
//       message: `Booking status updated to ${bookingStatus}.`,
//     });
//   } catch (error) {
//     console.error("Error handling booking request:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the booking request.",
//       error: error.message,
//     });
//   }
// };

exports.bookingRequest = async (req, res) => {
  try {
    const { listingId, bookingId, bookingStatus } = req.body;

    if (!listingId || !bookingId || !bookingStatus) {
      return res.status(401).json({
        success: false,
        message: "All fields are mandatory.",
      });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (user.accountType !== "Visitor") {
      return res.status(403).json({
        success: false,
        message: "You must be a visitor to book a listing.",
      });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Check if the user has already requested this listing
    const hasAlreadyRequested = listing.availability.some((slot) =>
      slot.requestedUser.includes(userId)
    );

    if (hasAlreadyRequested) {
      return res.status(400).json({
        success: false,
        message:
          "You have already requested this listing. Duplicate requests are not allowed.",
      });
    }

    if (!hasAlreadyRequested) {
      if (!listing.visitor.includes(userId)) {
        await Listing.findByIdAndUpdate(listingId, {
          $push: {
            visitor: userId,
          },
        });
      }
    }

    // Find the specific booking in availability array
    const filteredBooking = listing.availability.find(
      (item) => item._id.toString() === bookingId
    );

    if (!filteredBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found in the availability list.",
      });
    }

    filteredBooking.status = bookingStatus;
    filteredBooking.requestedUser.push(userId); // Add user to the requestedUser list

    // Add the booking request to the user's `bookedStays`
    user.bookedStays.push({
      listing: listingId,
      status: "requested",
    });

    // Send mail to the user:
    try {
      const emailResponse = await mailSender(
        req.user.email,
        "Requested Booking Email - from Wanderlust",
        `Your request has been forwared to the owner of the listing. If it get permitted by the owner, you will confirm you intantly.`
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    await user.save();
    await listing.save();

    res.status(200).json({
      success: true,
      message: "Booking request submitted successfully.",
    });
  } catch (error) {
    console.error("Error handling booking request:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the booking request.",
      error: error.message,
    });
  }
};

exports.bookingRequestByOwner = async (req, res) => {
  try {
    const { listingId, bookingId, bookingStatus, userId } = req.body;

    // Check for required fields
    if (!listingId || !bookingId || !bookingStatus || !userId) {
      return res.status(401).json({
        success: false,
        message: "All fields are mandatory.",
      });
    }

    const userAccountType = req.user.accountType; // Get account type (Owner)

    // Ensure user is an owner
    if (userAccountType !== "Owner") {
      return res.status(403).json({
        success: false,
        message: "Only an Owner can approve a booking request.",
      });
    }

    // Find the listing by ID
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    const owner = listing.owner; // Retrieve owner ID from listing

    // Find the specific booking in the availability array
    const filteredBooking = listing.availability.find(
      (item) => item._id.toString() === bookingId
    );

    if (!filteredBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found in the availability list.",
      });
    }

    // Check if the booking status is 'requested' before allowing the owner to mark it as 'booked'
    if (filteredBooking.status !== "requested") {
      return res.status(400).json({
        success: false,
        message: "This booking request is not in the 'requested' status.",
      });
    }

    // Update the booking status to 'booked'
    filteredBooking.status = "booked";

    // Update the visitor's `bookedStays` with the booking
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the listing already exists in `bookedStays`
    const existingStayIndex = user.bookedStays.findIndex(
      (stay) => stay.listing.toString() === listingId
    );

    if (existingStayIndex !== -1) {
      // Update the existing entry's status to 'booked'
      user.bookedStays[existingStayIndex].status = "booked";
    } else {
      // Add a new booked stay entry
      user.bookedStays.push({
        listing: listingId,
        status: "booked",
      });
    }

    await user.save();

    // Remove the booking request from the owner's list
    await User.findByIdAndUpdate(owner, {
      $pull: { bookingRequests: listing._id }, // Remove from owner's requests
    });

    await listing.save();

    try {
      const emailResponse = await mailSender(
        user.email,
        "Booking Confirmed Email - from Wanderlust",
        `Your request has been permitted by the owner. Now you can check your booking details in your dashboard booking section.`
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking successfully marked as booked.",
    });
  } catch (error) {
    console.error("Error handling booking approval:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the booking approval.",
      error: error.message,
    });
  }
};

exports.getBookedListings = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate the 'bookedStays' field without filtering
    const user = await User.findById(userId)
      .populate("bookedStays.listing") // No filter here, to include all requested and booked stays
      .exec();

    console.log("In backend user: ", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized.",
      });
    }

    if (user.accountType !== "Visitor") {
      return res.status(402).json({
        success: false,
        message: "User must be visitor.",
      });
    }

    // Hide sensitive data like email and password before sending response
    user.email = undefined;
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message:
        "User's booking requests and booked listings have been fetched successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while fetching booking listings.",
      error: error.message,
    });
  }
};

exports.requestedListings = async (req, res) => {
  try {
    const userId = req.user.id;

    const userSpecificListings = await Listing.find({
      owner: userId,
    })
      .populate({
        path: "owner",
        select: "name email",
      })
      .populate({
        path: "availability.requestedUser",
        select: "name email",
      });

    if (!userSpecificListings) {
      return res.status(404).json({
        success: false,
        message: "No listings found for this owner.",
      });
    }

    const filteredListings = userSpecificListings.filter((listing) =>
      listing.availability.some(
        (availabilityItem) => availabilityItem.status === "requested"
      )
    );

    return res.status(200).json({
      success: true,
      message: "Listings has been fetched successfully.",
      listings: filteredListings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while fetching listings requests.",
      error: error.message,
    });
  }
};
