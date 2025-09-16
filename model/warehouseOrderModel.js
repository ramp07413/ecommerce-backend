import mongoose from "mongoose";


const warehouseOrderSchema = new mongoose.Schema({
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },

    warehouseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "warehouse",
        required : true
    },

    items : [
        {
            warehouseProduct : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "warehouseProduct"
            },
            quantity : {
                type : Number
            },
            unitPrice : {
                type : Number
            }

        }
    ],

    totalAmount : {
        type : Number
    },

    status : {
        type : String,
        enum : ["pending", "approved", "delivered"],
        default : "pending"
    }

}, {timestamps : true})


export const warehouseOrder = mongoose.model("warehouseOrder", warehouseOrderSchema)

