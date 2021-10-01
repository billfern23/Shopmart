const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({ 
     name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: True
    },
    description: {
        type: String,
        required: False
    },
    category: {
        type: String,
        required: True
    },
    quantity: {
        type: String,
        required: True
    },
    BestSeller: {
        type:Boolean,
        required: True
    },
    url:{
        type:String,
        required:True
    }

    
})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;