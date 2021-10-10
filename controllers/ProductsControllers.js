const express = require('express')
const router = express.Router()
const Productservices = require('../services/Productsservices.js')


//Product Schema
// add product
router.post("/addproduct",ProductServices.addnewproduct );

//2. retrieve all product
//4. retrieve producst belonging to specific product category
//5. retrieve best selleter
router.get("/",ProductServices.retrieveandfilterProducts )

//3. filter to get all categories
router.get("/categories",ProductServices.showAllcategories)










module.exports = router