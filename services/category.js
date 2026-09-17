const slugify = require('slugify');
const categoryModel = require('../models/category');

/*create main-category*/
//desc: add new category
//access: private
//route: POST
const createCategory = async (req, res) => {
    const { name, image, slug } = req.body;

    try {
        const newCategory = await categoryModel.create({
            name: name,
            slug: slugify(name),
            image: req.file ? `/uploads/categories/${req.file.filename}` : null
        })
        res.status(201).json({ category: newCategory })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


/*get all-categories*/
//desc: get all-categories
//access: Public
//route: GET

const getAllCategories = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    try {
        const allCategories = await categoryModel.find({}).skip(skip).limit(limit);
        res.status(201).json({ results: allCategories.length, categories: allCategories });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/*get category only by id*/
//desc: get specific category
//access: public
//route: GET
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    /* if (!category) {
         res.status(400).json({ "error": "category is not find by id ${id}" })
     }
     res.status(201).json({ "category": category });*/
    try {
        res.status(201).json({ "category": category });
    }
    catch (error) {
        res.status(400).json({ "error": "category is not find by id ${id}" })
    }
}

/*update category*/
//desc: update category specific
//access: private
//route: PUT 
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModel.findOneAndUpdate({ "_id": id }, { "name": name, slug: slugify(name) }, { new: true })

    if (!category) {
        res.status(400).json({ "error": 'category is not find by id ${id}' })
    }
    res.status(201).json({ "category": category })
}


/*delete category by id*/
//desc: delete category by id
//access: private
//route: DELETE
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findOneAndDelete({ "_id": id });
    if (!category) {
        res.status(400).json({ "error": 'category is not find by id ${id}' })
    }
    res.status(201).json({ "category": category })
}
module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};