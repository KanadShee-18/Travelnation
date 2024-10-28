const Category = require("../models/Category");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Create category

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: `Category has been created successfully in the topic: ${categoryDetails.name}.`,
      categoryCreated: {
        data: categoryDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while creating the category.",
      error: error.message,
    });
  }
};

// Update Category:
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category id to modify it.",
      });
    }

    const findedCategory = await Category.findById(categoryId);
    if (!findedCategory) {
      return res.status(400).json({
        success: false,
        message:
          "No category is available with this id. Please re-check the id.",
      });
    }

    const { name, description } = req.body;

    let updatedData = {};

    if (name) updatedData.name = name;
    if (description) updatedData.description = description;

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Category has been updated successfully..",
      updated_category: {
        data: {
          category_data: updatedCategory,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while modifying the category.",
      error: error.message,
    });
  }
};

// Show All Categories:
exports.showCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    ).populate("listings");

    return res.status(200).json({
      success: true,
      message: `All Cateogries has been fetched successfully`,
      data: {
        categories: {
          details: allCategories,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting all the categories.",
      error: error.message,
    });
  }
};

// Get a particular category page:

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate("listings")
      .exec();

    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "No listings are available in this category.",
      });
    }

    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("listings")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All listings of this category has been fetched successfully.",
      categoryDetails: {
        data: [
          {
            selected: selectedCategory,
          },
          {
            others: otherCategories,
          },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting the category page details.",
      error: error.message,
    });
  }
};

// Delete category:

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Categeory id is required to destroy it.",
      });
    }

    const findCategory = await Category.findById(categoryId);

    if (!findCategory) {
      return res.status(400).json({
        success: false,
        message: `No category is available with this id: ${categoryId}`,
      });
    }

    const updatedListing = await Listing.updateMany(
      { category: categoryId },
      { $unset: { category: "" } }
    );

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: `Category with ID: ${categoryId} and associated references have been deleted.`,
      deleted_data: {
        data: [
          {
            updated_listing: updatedListing,
          },
          {
            deleted_category: deletedCategory,
          },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while deleting the category.",
      error: error.message,
    });
  }
};
