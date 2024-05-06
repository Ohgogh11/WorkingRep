const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Multer disk storage configuration for storing uploaded files.
 * @type {multer.diskStorage}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Middleware function that uses Multer to handle file uploads with the specified storage configuration.
 * @param {Object} storage - The storage configuration for uploaded files.
 * @returns Middleware function for handling file uploads.
 */
const upload = multer({ storage: storage }); //

/**
 * Deletes a product image with the given image name.
 * @param {string} imageName - The name of the image file to be deleted.
 * @returns None
 */
function deleteProductImage(imageName) {
  const filePath = `./images/${imageName}`;
  try {
    fs.unlink(filePath, (err) => {
      console.log(err);
    });
  } catch (error) {}
}

module.exports = {
  upload,
  deleteProductImage,
};
