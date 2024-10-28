const express = require("express");
const router = express.Router();

// Listing Controllers:
const {
  createNewListing,
  updateListing,
  deleteListing,
  getAllListings,
  getEachLising,
} = require("../controllers/Listing");

// Auth Middlewares:
const { auth, isOwner } = require("../middlewares/Auth");
const { fileUploadAuth } = require("../middlewares/FileUploadAuth");

// Listing routes:

router.get("/getListings", getAllListings);
router.get("/viewListing", getEachLising);

router.post("/createListing", auth, fileUploadAuth, isOwner, createNewListing);
router.post("/modifyListing", auth, fileUploadAuth, isOwner, updateListing);
router.post("/destroyListing", auth, isOwner, deleteListing);

module.exports = router;
