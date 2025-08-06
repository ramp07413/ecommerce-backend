import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    sentBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["sent", "failed"],
        default : "sent"
    },
    error : {
        type : String,
        default : null,
    }
}, {timestamps : true})


export const email = mongoose.model("email", emailSchema)