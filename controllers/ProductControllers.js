const express = require('express')
const router = express.Router()
const ProductServices = require('../services/ProductServices.js')

//6. Filter based on productid

router.get("/:id",ProductServices.getAProduct)


 //7. updates an existing product
router.put("/:id",ProductServices.updateAProduct)   

//8 deleting api
router.delete("/:id",ProductServices.deleteAproduct)


module.exports = router