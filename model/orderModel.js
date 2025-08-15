import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    orderItems : [
        {
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "productDetails",
            required : true
        },
        quantity : {
            type : Number,
            required : true,
            default : 1
        },
    }
],
shippingAddress : {
    street : {type : String, required : true},
    city : {type : String, required : true},
    state : {type : String, required : true},
    postalCode : {type : String, required : true},
    country : {type : String, required : true},
}
,
OrignalAmount : {
    type : Number,
    required : true
},
productPrice : {
    type : Number,
    required : true
},
finalAmount : {
    type : Number,
    required : true
},
couponDiscount :  {
    type : Number,
    default : 0
},
paymentStatus : {
    type : String,
    enum : ["pending", "paid"],
    default : "pending"
},
shippingStatus : {
    type : String,
    enum : ["processing", "shipped", "delivered", "cancelled"],
    default : "processing"
},

}, {timestamps : true})


export const order = mongoose.model("order", orderSchema)