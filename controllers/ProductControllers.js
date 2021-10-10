const express = require('express')
const router = express.Router()
const Productservices = require('../services/ProductServices.js')

//6. Filter based on productid

router.get("/:id",Productservices.getAProduct)


 //7. updates an existing product
router.put("/:id",Productservices.updateAProduct)   

//8 deleting api
router.delete("/:id",Productservices.deleteAproduct)


module.exports = router