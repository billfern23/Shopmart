const express = require("express");
require('dotenv').config({ path: 'config/keys.env'})
const PORT = 3000;

app = express();
app.listen(process.env.PORT,() =>{
    console.log(`Server is up and running ${process.env.Port}`)
})