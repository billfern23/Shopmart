const productModel = require('../models/Products.js')
//adding a new product
exports.addnewproduct = (req, res) => {
    const {name, price, description, category, quantity, bestSeller, picurl} = req.body;
    let errorList = {
        nameCheck: "",
        priceCheck: "",
        descriptionCheck: "",
        categorycheck: "",
        quantitycheck: "",
        bestSellercheck: "",
        picurlcheck: ""

    }
    
    let checker = true;
    if(name  == undefined){
        errorList.nameCheck = ` Missing name of product key in body, missing key: (name)`
        checker = false;
    }
    else {
        if(typeof(name) !== "string"){
            errorList.nameCheck = ` Input must be  string datatype`
            checker = false

        } else {
            String(name)
            if (name.length == 0){
                errorList.nameCheck = `name of product cannot be empty`;
                checker = false
              }
        }
      

    }
    if(price == undefined){
        errorList.priceCheck = ` Missing price of product key in body, missing key: (price)`
        checker = false;
    }
    else {
        if(typeof(price)!= "number"){
            errorList.priceCheck = `Price has to be a number datatype`
            checker = false;
        }
    }
    if(description !== undefined) {
        if(typeof(description) !== "string"){
            errorList.descriptionCheck = `  Input must be  string datatype`
            checker = false

        }
        else {
            if(description == ""){
                errorList.descriptionCheck = `Description cannot be empty. exclude property if not needed`
                checker = false

            }
        }

    }





    if(category == undefined){
        errorList.categorycheck = ` No category key provided in body, missing key: (category)`
        checker = false;
    }  else {
        if(typeof(category) !== "string"){
            errorList.categorycheck = ` Input must be  string datatype`
            checker = false

        } else {
            String(category)
            if (category.length == 0){
                errorList.categorycheck = `Category of product cannot be empty`;
                checker = false
              }
        }
    }

    if(quantity !== undefined){
       
        if(typeof(quantity)!= "number"){
            errorList.quantitycheck = `Quantity has to be a number datatype`
            checker = false;
        }
    }



    //***********************************************************************fix before handing it in************************************* */
    // if(bestSeller == ""){
    //     errorList.bestSellercheck = `No BestSeller provided, missing key: bestSeller`
    // }

    if(bestSeller == undefined){
        errorList.bestSellercheck =  ` No bestseller key provided in body, missing key: (bestSeller)`
        checker = false;
    }
    else {
        if(typeof(bestSeller)!== "boolean"){
            errorList.bestSellercheck = `Please use either true or false, case sensitive, no quotes, Boolean Type required`
            checker = false;
        }
    
     
    }
    if(picurl !== undefined) {
        if(typeof(picurl) !== "string"){
            errorList.picurlcheck = `  Input must be  string datatype`
            checker = false

        }
        else {
            if(picurl == ""){
                errorList.picurlcheck = `url cannot be empty. exclude property if not needed from body`
                checker = false

            }
        }

    }

  // deletes properties in errorList if properties are empty

  for (const property in errorList) {
    if (!errorList[property]) {
      delete errorList[property];
    }
  }
   

  

    if(!checker){
        res.status(400).json({
            message: `Product not added, Fix the following list of parameters`,
            data: errorList
        })
    }
    else {
        
            const newProduct = new productModel(req.body)
            newProduct.save()
            .then((product)=>{
                res.json({
                    message: `New Product was added successfully`,
                    data: product
                })
            })
            .catch((err)=>{
        
                res.status(500).json({
                    message:` err: ${err}`
                })
            })
        
    }
};

exports.retrieveandfilterProducts = (req, res) =>{
    if(req.query.category){
        productModel.find()
        .where("category").equals(req.query.category)
        .then((products) =>{
            if(products.length){
    
                res.json({
                    message: `Found products matching category ${req.query.category}`,
                    data: products
                })
            }
            else {
                res.json({
                    message: `Nothing found, please check category list with /categories, endpoint, case sensitive `,
              
                })
            }
        
    
        })
        .catch((err)=>{
            res.status(500).json({
                message: `error : ${err}`
            })
        })
    
    
    }
    
    else if(req.query.bestseller){
        if(req.query.bestseller == "yes" || req.query.bestseller == "Yes"){
    
            productModel.find()
            .where('bestSeller').equals(true)
            .then((bestsellers)=>{
                res.json({
                    message: `List of best sellers`,
                    data: bestsellers
                })
            })
            .catch((err)=>{
                res.status(500).json({
                
                    message: `err ${err}`
                })
                    
            })
        }
    
        else {
            res.json({
                message: `Please type yes or Yes`
            })
        }
    }
    
    else {
        
            productModel.find()
            .then((products)=>{
                res.json({
                    message: `List of all available products`,
                    Products: products
        
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message: `error : ${err}`
                })
            })
    
    }
};


exports.showAllcategories = (req, res) => {
    productModel.find({}).distinct('category')
    .then((products)=>{
        res.json({
            message: `List of categories`,
            categories: products

        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: `error : ${err}`
        })
    })
};


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
            res.status(400).json({
                message: `No Product with id ${req.params.id}`
            })
        }

    })
    .catch(err=>{
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


exports.updateAProduct = (req, res) =>{
    const {_id} = req.body;
    if(_id){
        res.status(404).json({
            message: `ids cannot be updated, please remove them from body`
        })
    } else {
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
        res.json({
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