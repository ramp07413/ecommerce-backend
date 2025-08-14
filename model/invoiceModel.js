import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber : {
        type : String, 
        unique : true,
        required : true
    },
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    // billingAddress : {
    //     name : String,
    //     address : String,
    //     city : String,
    //     state : String,
    //     pincode : String,
    //     country : String
    // },
     shippingAddress : {
       type : String
    },
    items : [
        {
            productName : String,
            // modelNumber : String,
            quantity : Number,
            price : Number,
            discount : Number
        }
    ],
    subTotal : Number,
    couponDiscount : Number,
    grandTotal : Number,
    orderDate : Date,
    invoiceNumber : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})