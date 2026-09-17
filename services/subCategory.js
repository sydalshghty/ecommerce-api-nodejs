const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const subCategoryModel = require('../models/subCategory');

/*create subCategory*/
//desc: create subCategory
//access: Pivate
//route: POST
const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const newSubCategory = await subCategoryModel.create({
            name: name,
            categoryId: categoryId,
            slug: slugify(name)
        })
        res.status(201).json({ subCategory: newSubCategory })
    }
    catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

/*get list of sub Categories*/
//desc: get all sub categories
//access: Public
//route: GET
const getAllSubCategories = async (req, res) => {
    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = (page - 1) * limit;
    try {
        const allSubCategories = await subCategoryModel.find({}).skip(skip).limit(limit).populate({ path: 'categoryId', select: 'name' });
        res.status(201).json({ "results": allSubCategories.length, "subCategories": allSubCategories })
    }
    catch (error) {
        res.status(400).json({ "error": error.message })
    }
}


/*get sub Category Specific*/
//desc: get subCategory Specific
//access: Public
//route: GET
const getSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subCategory = await subCategoryModel.findById(id).populate({ path: 'categoryId', select: 'name' });
    res.status(201).json({ "subCategory": subCategory });

});


/*update sub-Categry*/
//desc: update sub-category
//access: Private
//route: PUT
const updateSubCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const subCategory = await subCategoryModel.findByIdAndUpdate({ "_id": id }, { "name": name }, { slug: slugify(name) }, { new: true });
        res.status(201).json({ "data": subCategory });
    }
    catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

/*delete sub-category*/
//desc: delete sub category
//access: Private
//route: DELETE
const deleteSubCategory = async (req, res) => {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findByIdAndDelete({ "_id": id });
    if (!subCategory) {
        res.status(404).json({ "error": "sub category is not find by id ${id}" })
    }
    res.status(201).json({ "success": "subcategory is deleted successfully" })
}


module.exports = { createSubCategory, getAllSubCategories, getSubCategory, updateSubCategory, deleteSubCategory };