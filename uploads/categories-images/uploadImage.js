const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/categories-images');
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);

        cb(null, `category-${Date.now()}${extension}`);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;