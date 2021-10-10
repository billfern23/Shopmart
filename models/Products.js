const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({ 
     name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: false
    },
    bestSeller: {
        type:Boolean,
        required: true
    },
    picurl:
    {
        type:String,
        required:false
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }

    
})
const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;