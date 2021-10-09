// export multiple functions
//this is the layer that interacts with database with the bussiness logic
const customerModel = require('../models/Customer.js')
//creates a customer
exports.createACustomer = (req, res) => {
    const {fname, lname, email, password, phone }= req.body;
    let complete = {
        fnameCheck: true,
        lnameCheck: true,
        emailcheck: true,
        checkpasscode: true,
        checkphone: true

    }
    let checker = true;
  
    if(typeof(phone) === "string"){
        complete.checkphone =  `Phone is in string, you need to change it to number, remove quotations`
        checker = false
    }
    
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
        const newcustomer = new customerModel(req.body)
       
  
        newcustomer.save()
        .then((Customer)=>{
           res.json({
               message: "the customer successfully added",
               data: Customer
              
           })
        })
        .catch((err)=>{
            console.log(`error ${err}`)
            res.status(500).json({
                message: err
            })
        })
    }


};

//pull one customer
exports.getACustomer= (req, res) =>{    
 
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
        if(err.name == "CastError") {
            res.status(404).json({
                message: `Id format is incorrect, please fix, wrong number of characters in id`
            })
        }
        else {

            res.status(500).json({
                messsage:  err
            })
        }

        })
};