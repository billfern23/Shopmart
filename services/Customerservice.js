// export multiple functions
//this is the layer that interacts with database with the bussiness logic
const customerModel = require("../models/Customer.js");
//Registered new customer
exports.createACustomer = (req, res) => {
  //convert req.body into datatypes for easy processing
  
  const { fname, lname, email, password, phone } = req.body;
  

  let errorList = {
    fnameCheck: "",
    lnameCheck: "",
    emailcheck: "",
    passwordcheck: "",
    phonecheck: "",
  };
  //if this flag is turned to false, nothing gets saved
  let checker = true;

  //Checks the body to find if the required KEY is in the body being submited by user, if it is there, then proceeds to validate the 
  //value
  //Firstname
  if (fname == undefined) {
    errorList.fnameCheck = `First name Key required in body:(fname) `;
    checker = false;
  }
  else{
    if(typeof(fname) !== "string"){
        errorList.fnameCheck = ` Input must be  string datatype`
        checker = false

    } else {
        
        String(fname)
      if (!fname.length){
        errorList.fnameCheck = `First name  cannot be empty`;
        checker = false
      }
    

    }
      
  } 
//lastname
  if (lname == undefined) {
    errorList.lnameCheck = ` Last name Key required in body:(lname)`;
    checker = false;
  }
  else {
    if(typeof(lname) !== "string"){
        errorList.lnameCheck = ` Input must be  string datatype`
        checker = false

    } else {
        String(lname)
      if(!lname.length){
        errorList.lnameCheck = `Last name cannot be empty`;
        checker = false
      }

    }
    
  }
//email
  if (email == undefined) {
    errorList.emailcheck = `Missing email Key in body:(email)`;
    checker = false;
  }
 else {
    if(typeof(email) !== "string"){
        errorList.emailcheck = ` Input must be  string datatype`
        checker = false

    } else {

    String(email)

    if (!email.length) {
        errorList.emailcheck = `Email cannot be empty`;
        checker = false;
      }
      else {
        const regex = /[a-z0-9]+@[a-z]+.com|.ca$/gi
        
        if(!regex.test(email)){
            errorList.emailcheck = `Not a real email`;
                checker = false;
        }
      }
    }


 } 

 


//password
  if (password == undefined) {
    errorList.passwordcheck = ` password Key required in body:(password)`;
    checker = false;
  }

  else {
    if(typeof(password) !== "string"){
        errorList.passwordcheck = ` Input must be  string datatype`
        checker = false

    } else {

    String(password)
    
  if (password.length < 6) {
    errorList.passwordcheck = `Password is too short, minimum length 6`;
    checker = false;
  }
    }
  }

// only perform validation if phone is present in the body, if it is then it proceeds to validate the values otherwise skip.

  if(phone !== undefined) {
    if (typeof phone === "string") {
        errorList.phonecheck = `Phone is a numbers array, you have entered a string, remove quotation marks and put them []`;
        checker = false;
      }
 else {

      //if in array then you recieve an object, object length would be < 0, this checks each value if it is a string or if its not in an array
  if(phone.length === 0){
    errorList.phonecheck = `Empty array`;
    checker = false;
  }
  else if (!phone.length) {
     
    errorList.phonecheck = `Please put phone number that is in the format numbers array [phonenumber, faxnumber, etc]`;
    checker = false;
  } 
  else {
    if (typeof phone === "object") {
      for (const property in phone) {
        if (typeof phone[property] !== "number") {
          errorList.phonecheck = `One or more  Strings are present in an array, please remove quotation marks`;
          checker = false;
        }
       
      }
    }
  }

 }

}

  // deletes properties in errorList if properties are empty

  for (const property in errorList) {
    if (!errorList[property]) {
      delete errorList[property];
    }
  }

  //flag checker, returns 400, if values are missing, partial information
  if (!checker) {
    res.status(400).json({
      result: `Customer was not added, Fix following errors`,
      MissingParameters: errorList,
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
        res.status(500).json({
          message: err,
        });
      });
  }
};

//find a customer using ID 
exports.getACustomer = (req, res) => {
    if(!req.params.id){
        res.status(400).json({
            error: `Incomplete end point, https://shopmart24.herokuapp.com/customer/:id, id is required (replace:id with customer id)` 
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
        res.status(400).json({
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
