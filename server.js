const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config({ path: 'config/keys.env'})
const PORT = 3000;

app = express();
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