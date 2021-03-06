const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const customerSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: [Number],
    required: false,
  },
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
});
//pre saved Mongoose hook used here
customerSchema.pre("save", function (next) {  
  let customer = this;

  bcrypt.genSalt(parseInt(process.env.SALT)).then((salt) => {
    bcrypt
      .hash(customer.password, salt)
      .then((encryptedpwd) => {
        customer.password = encryptedpwd;
        next();
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  });
});

//Customers, collection name
//customerModel model object used to do CRUD operations
const CustomerModel = mongoose.model("Customers", customerSchema);

module.exports = CustomerModel;
