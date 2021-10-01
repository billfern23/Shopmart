//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose")
const customerModel = require('./models/Customer.js')

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