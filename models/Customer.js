const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const customerSchema = new Schema({
  fame:  {
        type: String,
        required:true     
    },
    lame:  {
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
        type: [Number]

    },
    dateCreate:{
        type: Date,
        default: Date.now()
    }



  
});

customerSchema.pre("save", function(next) {
    var customer = this;
    bycrpt.genSalt(10)
    .then((salt)=>{
        bycrpt.hash(customer.password, salt)
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