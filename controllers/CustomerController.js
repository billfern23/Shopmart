//used for grouping routes
const express = require('express')
const router = express.Router()
const Customerservice = require('../services/Customerservice.js')

//import customerservice services and use the function from there
router.post("/register",Customerservice.createACustomer)

//pull one customer
router.get("/:id",Customerservice.getACustomer)



module.exports = router