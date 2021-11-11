//assignment 1 that is working
const express = require("express");
const mongoose = require("mongoose");
//controllers
const customerController = require("./controllers/CustomerController.js");
const productsController = require("./controllers/ProductsControllers.js");
const productController = require("./controllers/ProductControllers.js");
const endpointController = require("./controllers/endPointController.js");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}

const app = express();
const allowlist = ['http://localhost:3000', 'https://eloquent-feynman-3510c7.netlify.app/']
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate
//user json
app.use(express.json());

// take all routers and put it in controllers
// import the customercontroller here
//seperated product and products based on operations requiring one or more products.
app.use("/customer", customerController);
app.use("/products", productsController);
app.use("/product", productController);
app.use(endpointController);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running ${process.env.Port}`);
  mongoose
    .connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then(() => {
      console.log(`Database connection successfull`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
});

//creating a new user
