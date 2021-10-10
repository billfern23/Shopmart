const express = require("express");
const router = express.Router();
const Productservices = require("../services/Productsservices.js");

//Product Schema

//2. retrieve all product
//4. retrieve producst belonging to specific product category
//5. retrieve best selleter
router.get("/", Productservices.retrieveandfilterProducts);

//3. filter to get all categories
router.get("/categories", Productservices.showAllcategories);

module.exports = router;
