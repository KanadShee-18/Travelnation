const express = require("express");
const router = express.Router();

// Listing Controllers:
const {
  createNewListing,
  updateListing,
  deleteListing,
  getAllListings,
  getEachLising,
  userSpecificListings,
  bookingRequest,
  requestedListings,
  bookingRequestByOwner,
} = require("../controllers/Listing");

// Auth Middlewares:
const { auth, isOwner, isViewer } = require("../middlewares/Auth");
const { fileUploadAuth } = require("../middlewares/FileUploadAuth");

// Listing routes:

router.get("/getListings", getAllListings);

router.post("/viewListing", getEachLising);
router.get("/owner-listing", auth, isOwner, userSpecificListings);
router.get("/owner-requested-listings", auth, isOwner, requestedListings);
router.post("/createListing", auth, fileUploadAuth, isOwner, createNewListing);
router.put("/modifyListing", auth, fileUploadAuth, isOwner, updateListing);
router.post("/requestBooking", auth, isViewer, bookingRequest);
router.post("/verifyBooking", auth, isOwner, bookingRequestByOwner);
router.delete("/destroyListing", auth, isOwner, deleteListing);

module.exports = router;
