const express = require("express");
const router = express.Router();

// Get Category handlers:
const {
  showCategories,
  createCategory,
  categoryPageDetails,
  deleteCategory,
  updateCategory,
} = require("../controllers/Category");

// Middlewares:
const { auth, isAdmin } = require("../middlewares/Auth");

// Category Routes:
router.get("/allCategories", showCategories);
router.get("/categoryPageDetails", categoryPageDetails);
router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/updateCategory", auth, isAdmin, updateCategory);
router.post("/deleteCategory", auth, isAdmin, deleteCategory);

module.exports = router;
