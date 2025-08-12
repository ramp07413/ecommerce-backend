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
        enum : ["user","buyer", "seller","employee", "admin"],
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
    isdisable : {
        type : Boolean,
        default : false
    },

    dateOfBirth : {
        type : Date
    },

    gender : {
        type : String,
        enum : ['male', 'female', 'other']
    },

    maritalStatus : {
        type : String,
        enum : ["Single", "Married"]
    },

    employeeId : {
        type : String,
        unique : true
    },

    nationality : {
        type : String
    },
    emergencyContactName : {
        type : String
    },
    emergencyContactNumber : {
        type : String
    },
    department : {
        type : mongoose.Schema.Types.ObjectId
    },
    designation : {
        type : String
    },
    dateOfJoined : {
        type : Date
    },
    contractType : {
        type : String
    },
    salary : {
        type : Number
    }, 
    bankAccount : {
        type : new mongoose.Schema({
                    accountHolderName : {
            type : String
        },
        accountNumber : {
            type : String
        },
        ifcCode : {
            type : String
        },
        bankName : {
            type : String
        },
        branchName : {
            type : String
        },
        }),

        select : false
    }, 
    taxId : {
        type : String
    },
    // photo
    // resume

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



