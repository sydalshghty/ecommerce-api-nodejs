const express = require('express');
const subCategoryRouter = express.Router();
const { createSubCategory, getAllSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('../services/subCategory');

subCategoryRouter.post('/add-new-subCategory', createSubCategory);
subCategoryRouter.get('/all-subCategories', getAllSubCategories);
subCategoryRouter.get('/subCategory/:id', getSubCategory);
subCategoryRouter.put('/updatesubCategory/:id', updateSubCategory);
subCategoryRouter.delete('/deletesubCategory/:id', deleteSubCategory);

module.exports = subCategoryRouter;