const brandModel = require('../models/brand');
//const mongoose = require('mongoose');
const slugify = require('slugify');

/*create brand*/
//desc: create brand
//access: Private
//route: POST
const createBrand = async (req, res) => {
    const { name, image } = req.body;
    try {
        const newBrand = await brandModel.create({
            name: name,
            slug: slugify(name),
            image: req.file.filename,
        })
        res.status(201).json({ 'brand': newBrand })
    }
    catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}


/*get all-brands*/
//desc: get all brands
//access: Public
//route: GET
const getAllBrands = async (req, res) => {
    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    try {
        const allbrands = await brandModel.find({}).skip(skip).limit(limit);
        res.status(201).json({ 'results': allbrands.length, 'brands': allbrands })
    }
    catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}


/*get brand only by id ( specific brand )*/
//desc: get specific brand by id
//access: Public
//route: GET
const getBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await brandModel.findById(id);
        res.status(201).json({ 'brand': brand })
    }
    catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

/*update brand by id*/
//desc: update brand by id
//access: Private
//route: PUT
const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const brand = await brandModel.findByIdAndUpdate({ "_id": id }, { "name": name, "slug": slugify(name) }, { new: true })
        res.status(201).json({ 'brand': brand })
    }
    catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

/*delete brand by id*/
//desc: delete brand by id
//access: Private
//route: DELETE

const deleteBrand = async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await brandModel.findByIdAndDelete({ "_id": id });
        res.status(201).json({ "msg": "brand is deleted successfully" })
    }
    catch (error) {
        res.status(400).json({ "error": error.message })
    }
}


module.exports = {
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
};
