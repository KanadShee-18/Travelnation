exports.fileUploadAuth = async (req, res, next) => {
  try {
    if (req.files && req.files.images) {
      let images = req.files.images;

      if (!Array.isArray(images)) {
        images = [images];
      }

      const maxFileSize = 1 * 1024 * 1024;

      for (const image of images) {
        if (image.size > maxFileSize) {
          return res.status(400).json({
            success: false,
            message: "File size exceeds. Size should be less than 1MB.",
          });
        }
      }
      req.imagesArray = images;
      console.log("Passed from file upload auth ...");
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while checking files. Please try again.",
      error: error.message,
    });
  }
};
