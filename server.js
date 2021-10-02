//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose");
const { where } = require("./models/Customer.js");
const customerModel = require('./models/Customer.js')
const productModel = require('./models/Products.js')

if(process.env.NODE_ENV!="production"){
    
    require('dotenv').config({ path: 'config/keys.env'})
}
const PORT = 3000;


app = express();
//user json
app.use(express.json());


app.post("/register", function(req,res){
    const {fname, lname, email, password} = req.body;
    let complete = {
        fnameCheck: true,
        lnameCheck: true,
        emailcheck: true,
        checkpasscode: true,

    }
  
    let checker = true;
    
    if(!fname){
        complete.fnameCheck = `Missing First name Key:(fname)`
        checker = false
    }

    if(!lname){
        complete.lnameCheck = `Missing Last name Key:(lname)`
        checker = false
    }
    if(!email){
        complete.emailcheck = `Missing email Key:(email)`
        checker = false
    }
    if(!password){
        complete.checkpasscode = `Missing password Key:(password)`
        checker = false
    }
    
    if(password.length < 6){
        complete.checkpasscode = `Password is too short, minimum length 6`
        checker = false
    }

    if(!checker){
        res.status(400).json({
            hint: `Complete the parameters`,
            message: complete
        })
    }
    //instantiate the document you created in model
    else {
        const customer = new customerModel(req.body)
  
        customer.save()
        .then((newCustomer)=>{
           res.json({
               message: "the customer successfully added",
               data: newCustomer
           })
        })
        .catch((err)=>{
            console.log(`error ${err}`)
            res.status(500).json({
                message: err
            })
        })
    }





})
//pull one customer
app.get("/customers/:id", (req, res) =>{
 
    customerModel.findById(req.params.id)
    .then(Customer=>{
        if(Customer){
            
            res.json({
                message : `Customer with id ${req.params.id}`,
                data: Customer
            })
        }
        else {
            res.status(400).json({
                message: `No customer with id ${req.params.id}`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            messsage:  err
        })

        })
    })



//Product Schema
// add product
app.post("/addproduct", (req, res)=>{
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

})
//2.4. 5. retreieve all products

app.get("/products",(req, res)=>{
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

})

//3. filter for categories
app.get("/categories",(req, res)=>{
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
})



//6. Filter based on productid

app.get("/products/:id", (req, res) =>{
   
 
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
                message: `No customer with id ${req.params.id}`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            messsage:  err
        })

        })
    })


 //7. updates an existing product
 app.put("/products/:id", (req, res)=>{
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
 })   

//8 deleting api
app.delete("/products/:id", (req, res)=>{
    productModel.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({
            message: `Product with ${req.params.id} was deleted`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: `err ${err}`
        })
    })

})











app.listen(process.env.PORT,() =>{
    console.log(`Server is up and running ${process.env.Port}`)
    mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then(()=>{
        console.log(`Database connection successfull`)
    })
    .catch(err=>{
        console.log(`Error: ${err}`)
    })


})


//creating a new user