//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose");
//const { where } = require("./models/Customer.js");
//const customerModel = require('./models/Customer.js')
const customerController = require('./controllers/CustomerController.JS')
const productController = require('./controllers/ProductControllers.js')


if(process.env.NODE_ENV!="production"){
    
    require('dotenv').config({ path: 'config/keys.env'})
}
const PORT = 3000;


const app = express();
//user json
app.use(express.json());

// take all routers and put it in controllers
// import the customercontroller here
app.use("/customers", customerController);
app.use("/products", productController);

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