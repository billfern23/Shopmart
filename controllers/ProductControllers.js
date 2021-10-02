const express = require('express')
const router = express.Router()
const Productservices = require('../services/Productsservices.js')


//Product Schema
// add product
router.post("/addproduct",Productservices.addnewproduct );

//2. retrieve all product
//4. retrieve producst belonging to specific product category
//5. retrieve best selleter
router.get("/",Productservices.retrieveandfilterProducts )

//3. filter for categories
router.get("/categories",Productservices.showAllcategories)



//6. Filter based on productid

router.get("/:id",Productservices.getAProduct)


 //7. updates an existing product
router.put("/:id",Productservices.updateAProduct)   

//8 deleting api
router.delete("/:id",Productservices.deleteAproduct)






module.exports = router