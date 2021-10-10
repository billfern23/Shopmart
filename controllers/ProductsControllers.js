const express = require("express");
const router = express.Router();
const Productservices = require("../services/Productsservices.js");

//Product Schema
/*this covers all these routes
    2. retrieve all product
    4. retrieve producst belonging to specific product category
    5. retrieve best selleter 
*/
router.get("/", Productservices.retrieveandfilterProducts);

//3. Get all categories value
router.get("/categories", Productservices.showAllcategories);

module.exports = router;
