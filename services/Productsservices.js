const productModel = require('../models/Products.js')
exports.addnewproduct = (req, res) => {
    const {name, price, category, bestSeller} = req.body;
    let completeproduct = {
        nameCheck: true,
        priceCheck: true,
        categorycheck: true,
        bestSellercheck: true,

    }
    console.log(bestSeller)
    let checker = true;
    if(!name){
        completeproduct.nameCheck = ` No name provided, missing key: (name)`
        checker = false;
    }
    if(!price){
        completeproduct.priceCheck = ` No price provided, missing key: (price)`
        checker = false;
    }
    if(!category){
        completeproduct.categorycheck = ` No category provided, missing key: (category)`
        checker = false;
    }
    //***********************************************************************fix before handing it in************************************* */
    // if(bestSeller == ""){
    //     completeproduct.bestSellercheck = `No BestSeller provided, missing key: bestSeller`
    // }
    if(bestSeller  !== "true" && bestSeller  !== "false"  ){
        completeproduct.bestSellercheck = `Please use either true or false, case sensitive, or missing key(Boolean)`
        checker = false;
    }
    if(!checker){
        res.json({
            message: `Complete the listed parameters`,
            data: completeproduct
        })
    }
    else {
        
            const product = new productModel(req.body)
            product.save()
            .then((newProduct)=>{
                res.json({
                    message: `New Product was added successfully`,
                    data: newProduct
                })
            })
            .catch((err)=>{
        
                res.status(500).json({
                    message:` err: ${errr}`
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
        res.status(500).json({
            messsage:  err
        })

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
            res.status(500).json({
                message: `err ${err}`
            })
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
        res.status(500).json({
            message: `err ${err}`
        })
    })
};