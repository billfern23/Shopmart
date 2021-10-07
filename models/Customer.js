const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const customerSchema = new Schema({
   fname:  {
        type: String,
        required:true     
    }, 
    lname:  {
        type: String,
        required:true     
    },
    email:  {
        type: String,
        required:true     
    }, 
    password:{
        type:String,
        required:true
    },
    phone: {
        type: [Number],
        required:false

    },
    dateCreate:{
        type: Date,
        default: Date.now()
    }



  
});

customerSchema.pre("save", function(next) {

    var customer = this;
    
    
    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(customer.password, salt)
        .then((encryptedpwd)=>{
            customer.password = encryptedpwd
            next()
        })
        .catch((err)=>{
            console.log(`Error: ${err}`)
        })
        .catch((err)=>{
            console.log(`Errorr" ${err}`)
        })
    })
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;