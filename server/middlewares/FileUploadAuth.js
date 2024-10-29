exports.fileUploadAuth = async (req, res, next) => {
  try {
    // Initialize an array to hold the images
    console.log("Req files are: ", req.files);

    let images = [];

    // Loop through the keys in req.files
    for (const key in req.files) {
      images.push(req.files[key]);
    }

    console.log("Images are after pushing in array: ", images);

    if (images.length > 0) {
      const maxFileSize = 1 * 1024 * 1024; // 1MB size limit

      for (const image of images) {
        if (image.size > maxFileSize) {
          return res.status(400).json({
            success: false,
            message: "File size exceeds. Size should be less than 1MB.",
          });
        }
      }
      req.imagesArray = images; // Attach the array to req
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
