//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose");

const customerController = require('./controllers/CustomerController.js')
const productsController = require('./controllers/ProductsControllers.js')
const productController = require('./controllers/ProductController.js')
const endpointController = require('./controllers/endPointController.js') 


if(process.env.NODE_ENV!="production"){
    
    require('dotenv').config({ path: 'config/keys.env'})
}



const app = express();
//user json
app.use(express.json());

// take all routers and put it in controllers
// import the customercontroller here
app.use("/customer", customerController);
app.use("/products", productsController);
app.use("/product", productController);
app.use(endpointController)

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