import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber : {
        type : String, 
        unique : true,
        required : true
    },
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'order',
        required : true,
        unique : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
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
    invoiceDate : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})


export const invoice = mongoose.model("invoice", invoiceSchema)