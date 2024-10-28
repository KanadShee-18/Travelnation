const express = require("express");
const router = express.Router();

// Review Controllers:
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/Review");

// Middlewares:
const { auth, isViewer } = require("../middlewares/Auth");

// Review Routes:

router.get("/allReviews", getAllReviews);
router.post("/createReview", auth, isViewer, createReview);
router.post("/updateReview", auth, isViewer, updateReview);
router.post("/deleteReview", auth, isViewer, deleteReview);

module.exports = router;
