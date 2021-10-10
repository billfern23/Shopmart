const productModel = require('../models/Products.js')


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
                    totalNumber: products.length,
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

