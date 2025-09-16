import mongoose from "mongoose";

const warehouseProductSchema = new mongoose.Schema({
    warehouseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "warehouse",
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "productDetails",
        required : true
    },
    sku : { //stoke keeping unit
        type : String,
        unique : true //IP15-256GB-BLK
    },
    quantity : {
        type : Number,
        default : 0
    },

    costPrice : {
        type : Number
    },
    expiryDate : {
        type : Date
    },
    batchNumber : {
        type : String 
    }
}, {
    timestamps : true
})

export const warehouseProduct = mongoose.model("warehouseProudct", warehouseProductSchema)