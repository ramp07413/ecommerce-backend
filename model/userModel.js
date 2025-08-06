import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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
        required : false,
        select : false
    },
    role : {
        type : String,
        enum : ["user","buyer", "seller", "admin"],
        default : 'buyer'
    },
    
    phoneNumber : {
        type : String,
        required : true
    },
    address : {
        street : String,
        city : String,
        state : String,
        country : String,
        zipcode : String
    },
    isbanned : {
        type : Boolean,
        default : false
    },

    resetPasswordToken : String,
    resetPasswordTokenExpire : Date
    
}, {timestamps : true}
)

userSchema.methods.generateToken = function(){
    return jwt.sign({id : this.id, email : this.email}, "secret")
}


userSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordTokenExpire = Date.now() + 1000 * 60 * 15
    return resetToken
}

export const user = mongoose.model("user", userSchema)



