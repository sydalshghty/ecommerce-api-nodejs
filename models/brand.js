const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: [true, 'brand name must be unique'],
            required: [true, 'brand name is required'],
            minlength: [2, 'Too short brand name'],
            maxlenght: [32, 'Too long brand name']
        },
        slug: {
            type: String,
            lowercase: true
        },
        image: {
            type: String,
            required: [true, 'brand image is required'],
        }
    },
    { timestamps: true }
);

const brandModel = mongoose.model('brandModel', brandSchema);

module.exports = brandModel;