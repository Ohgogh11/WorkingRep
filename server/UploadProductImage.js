const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

function deleteProductImage(imageName) {
    const filePath = `./images/${imageName}`;
    try {
        fs.unlink(filePath, (err) => {
            console.log(err);
        });
    } catch (error) {
    }
}

module.exports = {
    upload,
    deleteProductImage,
};