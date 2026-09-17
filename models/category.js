const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'category must be required'],
            unique: [true, 'category name must be unique'],
            minlength: [2, 'Too short category name'],
            maxlength: [32, 'Too long category name']
        },
        slug: {
            type: String,
            lowercase: true
        },
        image: {
            type: String,
            required: [true, 'image category is required']
        }
    },
    { timestamps: true }
);

const categoryModel = mongoose.model('categoryModel', categorySchema);

module.exports = categoryModel;