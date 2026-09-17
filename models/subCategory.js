const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'subcategory must be required'],
            unique: [true, 'subcategory must be unique'],
            minlength: [2, 'Too Short Subcategory Name'],
            maxlength: [32, 'Too Long Subcategory Name'],
        },
        slug: {
            type: String,
            lowercase: true
        },
        categoryId: {
            type: mongoose.Schema.ObjectId,
            ref: 'categoryModel',
            required: [true, 'subCategory must be belong to parent category']
        }
    },
    { timestamps: true }
);

const subCategoryModel = mongoose.model('subCategoryModel', subCategorySchema);

module.exports = subCategoryModel;