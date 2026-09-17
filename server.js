const express = require('express');
const app = express();
app.use(express.json());
//connect .env file
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });

//connect mongoose_DB
const dns = require('dns');
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

const dbconnection = require('./confic/db_connection');
dbconnection();

//api routes amount
const router = require('./routesApi/category');
const subCategoryRouter = require('./routesApi/subCategory');
const routerBrands = require('./routesApi/brand');
app.use('/api/v1/categories', router);
app.use('/api/v1/subCategories', subCategoryRouter);
app.use('/api/v1/brands', routerBrands);

//uploads images
app.use('/uploads', express.static('uploads'));

//Error on Routes
app.use((req, res, next) => {
    const err = new Error(`Can not find this route: ${req.originalUrl}`);
    next(err.message);
})

//Global Error Handling
app.use((err, req, res, next) => {
    res.status(500).json({ "error": err.message })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})