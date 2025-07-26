import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    shopName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    itemTag : {
        type : String,
        required : true
    },
    shippingTag : {
        type : String,
        required : false
    }

})

export const productDetails = mongoose.model("productDetails", productSchema)