// export multiple functions
//this is the layer that interacts with database with the bussiness logic
const customerModel = require("../models/Customer.js");
//creates a customer
exports.createACustomer = (req, res) => {
  //convert req.body into datatypes for easy processing
  const { fname, lname, email, password, phone } = req.body;
  //object to save errors and then delete empty ones after
  let errorList = {
    fnameCheck: "",
    lnameCheck: "",
    emailcheck: "",
    passwordcheck: "",
    phonecheck: "",
  };
  //if this flag is turned to false, nothing gets saved
  let checker = true;

  //if in array then you recieve an object, object length would be < 0, this checks each value if it is a string or if its not in an array
  if (!phone.length) {
    errorList.phonecheck = `Please put phone number shoud be a numbers array []`;
    checker = false;
  } else {
    if (typeof phone === "object") {
      for (const property in phone) {
        if (typeof phone[property] !== "number") {
          errorList.phonecheck = `One or more  Strings are present in an array, please remove quotation marks`;
          checker = false;
        }
      }
    }
  }

  //this checks phone, if a single string has been entered example: "a"

  if (typeof phone === "string") {
    errorList.phonecheck = `Phone is a numbers array, you have entered a string, remove quotation marks and put them []`;
    checker = false;
  }

  //checks if firstname value is missing
  if (!fname) {
    errorList.fnameCheck = `Missing First name Key:(fname)`;
    checker = false;
  }
  if(!fname.length){
    errorList.fnameCheck = `First name field is empty`;
    checker = false
  }

  //checks if lastname value is missing
  if (!lname) {
    errorList.lnameCheck = `Missing Last name Key:(lname)`;
    checker = false;
  }
  if(!lname.length){
    errorList.lnameCheck = `Last name field is empty`;
    checker = false
  }
  //checks if email is missing
  if (!email) {
    errorList.emailcheck = `Missing email Key:(email)`;
    checker = false;
  }
  if (!email.length) {
    errorList.emailcheck = `Email is missing`;
    checker = false;
  }


  
  //checks if password was not enetered
  if (!password) {
    errorList.passwordcheck = `Missing password Key:(password)`;
    checker = false;
  }


  //checks for minimum length
  if (password.length < 6) {
    errorList.passwordcheck = `Password is too short, minimum length 6`;
    checker = false;
  }

  // deletes properties in errorList if  are no errors generated leaving only errors.

  for (const property in errorList) {
    if (!errorList[property]) {
      delete errorList[property];
    }
  }

  //flag checker, returns 400, if values are missing, partial information
  if (!checker) {
    res.status(400).json({
      result: `Customer was not added`,
      message: `Missing values, or values dont meet criteria, fix`,
      Fieldsmissing: errorList,
    });
  }
  //instantiate the document you created in model, sends 500, for server error because this has to be server error
  else {
    const newcustomer = new customerModel(req.body);
    newcustomer
      .save()
      .then((Customer) => {
        res.json({
          message: "the customer successfully added",
          data: Customer,
        });
      })
      .catch((err) => {
        console.log(`error ${err}`);
        res.status(500).json({
          message: err,
        });
      });
  }
};

//pull one customer
exports.getACustomer = (req, res) => {
    if(!req.params.id){
        res.status(400).json({
            error: `Incomplete end point, https://shopmart24.herokuapp.com//customer/id, id is required` 
        })
    }
    else {
  customerModel
    .findById(req.params.id)
    .then((Customer) => {
      if (Customer) {
        res.json({
          message: `Customer with id ${req.params.id}`,
          data: Customer,
        });
      } else {
        res.status(404).json({
          message: `No customer with id ${req.params.id} found, incorrect ID`,
        });
      }
    })
    .catch((err) => {
      if (err.name == "CastError") {
        res.status(404).json({
          message: `Id format is incorrect: id either too long or wrong, this id cannot be a mongdb id`
        });
      } else {
        res.status(500).json({
          messsage: err,
        });
      }
    });
}
};
