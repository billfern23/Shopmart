//used for grouping routes
const express = require("express");
const router = express.Router();
const Customerservice = require("../services/Customerservice.js");

//import customerservice services and use the function from there
//1. register customer
router.post("/register", Customerservice.createACustomer);

//2.findone one customer
router.get("/:id", Customerservice.getACustomer);

//3. Handle routes when the customer forgets to put /:id with an id
router.get("/", Customerservice.getACustomer);

module.exports = router;
