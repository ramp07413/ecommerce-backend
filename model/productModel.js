import mongoose, { Schema } from "mongoose";


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
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    itemTag : {
        type : String,
        required : true
    },
    shippingTag : {
        type : String,
        required : false
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    discount : {
        type : Number,
        default : 0
    },
    
}, {timestamps : true})

export const productDetails = mongoose.model("productDetails", productSchema)