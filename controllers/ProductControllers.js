const express = require("express");
const router = express.Router();
const ProductServices = require("../services/ProductServices.js");

// Had to move this because, each one only deals with one product at a time, not multiple, so leaving it in products felt wrong
//6. Filter based on productid

router.get("/:id", ProductServices.getAProduct);
// add product
router.post("/addproduct", ProductServices.addnewproduct);

//7. updates an existing product
router.put("/:id", ProductServices.updateAProduct);

//8 deleting api
router.delete("/:id", ProductServices.deleteAproduct);

module.exports = router;
