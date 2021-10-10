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
        errorList.nameCheck = ` Product name key required in body, missing key: (name)`
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
        errorList.priceCheck = ` Price key required in body, missing key: (price)`
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
        errorList.categorycheck = ` Category key required in body, missing key: (category)`
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
        errorList.bestSellercheck =  ` Best seller key required in body, missing key: (bestSeller)`
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
                res.status(404).json({
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
        if(req.query.bestseller == "yes" || req.query.bestseller == "YES"){
    
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
            res.status(404).json({
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

//all categories
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