const express = require('express');
const router = express.Router();
const upload = require('../uploads/categories-images/uploadImage');
const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../services/category');

router.post('/add-new-category', upload.single('image'), createCategory);
router.get('/getallcategories', getAllCategories);
router.get('/getcategory/:id', getCategory);
router.put('/updatecategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);

module.exports = router;