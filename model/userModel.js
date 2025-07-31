import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        enum : ["buyer", "seller", "admin"],
        default : 'buyer'
    },
    phoneNumber : {
        type : String,
    },
    address : {
        street : String,
        city : String,
        state : String,
        country : String,
        zipcode : String
    }
    
}, {timestamps : true}
)

userSchema.methods.generateToken = function(){
    return jwt.sign({id : this.id, email : this.email}, "secret")
}

export const user = mongoose.model("user", userSchema)



