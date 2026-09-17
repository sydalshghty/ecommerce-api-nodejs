const express = require('express');
const routerBrands = express.Router();
const { createBrand, getAllBrands, getBrand, updateBrand, deleteBrand } = require('../services/brand');
const upload = require('../uploads/brands-images/upload');

routerBrands.post('/add-new-brand', upload.single('image'), createBrand);
routerBrands.get('/get-all-brands', getAllBrands);
routerBrands.get('/get-brand/:id', getBrand);
routerBrands.put('/update-brand/:id', updateBrand);
routerBrands.delete('/delete-brand/:id', deleteBrand);
module.exports = routerBrands;