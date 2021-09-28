//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose")
const customerModel = require('./models/Customer.js')
require('dotenv').config({ path: 'config/keys.env'})
const PORT = 3000;


app = express();
//user json
app.use(express.json());
//creating a new user
app.post("/register",(req,res)=>{
    //instantiate the document you created in model
   const customer = new customerModel(req.body)
   customer.save()
   .then((newCustomer)=>{
      res.json({
          message: "the customer successfully added",
          data: newCustomer
      })
   })
   .catch((err)=>{
       console.log(`Errod ${err}`)
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