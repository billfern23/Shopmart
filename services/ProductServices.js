
const productModel = require('../models/Products.js')
//find product by id
exports.getAProduct = (req, res) =>{
    productModel.findById(req.params.id)
    .then(Product=>{
        if(Product){
            
            res.json({
                message : `Product with id ${req.params.id}`,
                data: Product
            })
        }
        else {
            res.status(404).json({
                message: `No Product with id ${req.params.id}`
            })
        }

    })
    .catch(err=>{
        if(err.name == "CastError") {
            res.status(404).json({
                message: `Id format is incorrect, please fix, Its either too long or too short or is not an id`
            })
        }
        else {

            res.status(500).json({
                messsage:  err
            })
        }

        })
};

//update one
exports.updateAProduct = (req, res) =>{
    const {_id, name, price, description, category, quantity, bestSeller, picurl} = req.body;
    if(_id){
        res.status(404).json({
            message: `ids cannot be updated, please remove them from body`
        })
    } else {
        let errorListupdate = {
            nameCheck: "",
            priceCheck: "",
            descriptionCheck: "",
            categorycheck: "",
            quantitycheck: "",
            bestSellercheck: "",
            picurlcheck: ""
    
        }
        let checker = "true"
        
        if(name != undefined){
            if(typeof(name)!== "string"){
               
                errorListupdate.nameCheck = ` Name has to be a string Type`
                checker = false
            }
            else if(name == "") {
                errorListupdate.nameCheck = `Name cannot be empty`
                checker = false
            }
        }
      
         if(price != undefined){
            if(typeof(price)!== "number"){
               
                errorListupdate.priceCheck = ` Price has to be a number Type`
                checker = false
            }
           
        }
        if(description != undefined){
            if(typeof(description)!== "string"){
               
                errorListupdate.descriptionCheck = ` Description has to be a string Type but can be replaced to empty`
                checker = false
            }
        }


        if(category != undefined){
            if(typeof(category)!== "string"){
               
                errorListupdate.categorycheck = ` Category has to be a string Type`
                checker = false
            }
            else if(category == "") {
                errorListupdate.categorycheck = `Category cannot be empty`
                checker = false
            }
        }
        
        if(quantity != undefined){
            if(typeof(quantity)!== "number"){
               
                errorListupdate.quantitycheck = ` Convert quantity to 0 to show remove`
                checker = false
            }
           
        }

        if(bestSeller != undefined){
            if(typeof(bestSeller)!== "boolean"){
               
                errorListupdate.bestsellercheck = ` Bestseller has to be a Boolean Type, true/false`
                checker = false
            }
        
        }

        if(picurl != undefined){
            if(typeof(picurl)!== "string"){
               
                errorListupdate.picurlcheck = ` Pic url has to be a string Type but can be replaced to empty`
                checker = false
            }
        }


        for (const property in errorListupdate) {
            if (!errorListupdate[property]) {
              delete errorListupdate[property];
            }
          }
           
        



        if(!checker){
            res.json({
                message: `Some parameters need fixing before you update, otherwise take them out`,
                paramters: errorListupdate
            })
        }

        else {

            productModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then((Product) =>{
                if(Product){
    
                    res.json({
                        message: `Product with the id ${req.params.id} was updated`,
                        data: Product
                    })
                }
                else {
                    res.status(404).json({
                            message: `Product with id ${req.params.id} does not exist`
                    })
                }
    
            })
            .catch((err)=>{
                if(err.name == "CastError") {
                    res.status(404).json({
                        message: `Id format is incorrect, please fix, wrong number of characters in id`
                    })
                }
                else {
        
                    res.status(500).json({
                        messsage:  err
                    })
                }
        
            })
            
        }
        }
};


exports.deleteAproduct = (req, res) =>{
    productModel.findByIdAndDelete(req.params.id)
    .then((Product)=>{
      if(Product){
         
          res.json({
              message: `Product with ${req.params.id} was deleted`
            
              
          })

      }
      else {
        res.status(400).json({
            message: `Incorrect ID, product with ${req.params.id} does not exists`
        })
      }
    })
    .catch((err)=>{
        if(err.name == "CastError") {
            res.status(404).json({
                message: `Id format is incorrect, please fix, wrong number of characters in id`
            })
        }
        else {

            res.status(500).json({
                messsage:  err
            })
        }
    })
};