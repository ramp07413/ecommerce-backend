import { sendToken } from "../utils/sendToken.js";
import { user } from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { order } from "../model/orderModel.js";
import { wishlist } from "../model/wishlistModel.js";
import { client, googleresponse } from "../utils/googletoken.js";
import { send } from "process";
import { sendEmail } from "../utils/emailSend.js";
import crypto from 'crypto'


export const userRegister = async(req, res, next)=>{
    try{

    const {userName, email , password} = req.body;

    if(!userName || !email || !password){
        return next(new Error("please fill all the fields ! "))
    }

    let data = await user.findOne({email})

    if(data){
        return next(new Error("user alredy exits !"))
    }
    const hashPassword = await bcrypt.hash(password, 10)
    data = await user.create({
        userName,
        email,
        password : hashPassword
    })


    sendToken(data, 201 , "user registered successfully", req, res)

}
catch(err){
    return next(new Error("internal server error"))
}

}




export const googleLogin = async(req, res, next)=>{
    try{
         const code = req.query.code
        const data = await googleresponse(code)
        const {name , email} = data
        console.log("name", name)
        console.log("email", email)
   

    let mydata = await user.findOne({email})

    if(!mydata){
        mydata = await user.create({
         userName : name,
         email
            })
    }

    if(mydata.isbanned){
        return(next(new Error("user is banned please contact to support . ")))
    }

    sendToken(mydata, 200 , "user login successfully", req, res)
}
 catch(err){
        return next(new Error("login failed !"))
    }

}

export const googleurl = async(req, res, next)=>{
    const url = client.generateAuthUrl({
            access_type : 'offline',
            scope : ['profile', 'email']
        })
        
        console.log(url)
        res.redirect(url)
}


export const userLogin = async(req, res, next)=>{
    try{

    const {email , password} = req.body;

    if(!email || !password){
        return next(new Error("please fill all the fields ! "))
    }

    let data = await user.findOne({email}).select("+password")

    if(!data){
        return next(new Error("user doesn't exits !"))
    }
    if(data.isbanned){
        return(next(new Error("user is banned please contact to support . ")))
    }
   
    
    const isPasswordMatched = await bcrypt.compare(password, data.password)
   

    if(!isPasswordMatched){
        return next(new Error("invaild email or password"))
    }

    sendToken(data, 200, "login successfully", req, res)

}
catch(err){
    return next(new Error("internal server error"))
}

}


export const getUser = async(req, res, next)=>{
    try{
    const user = req.user
    
    res.status(200).send({
        success : true,
        user
    })
}
catch(err){
    return next(new Error("internal server error"))
}
}

export const userLogout = (req, res, next)=>{
    try{

        res.status(200).cookie("token", "").json({
            success : true,
            message : "logout successfully !"
        })
    }
    catch(err){
        return next(new Error("something went wrong !"))
    }
}


export const userProfile = async (req, res, next)=>{
    try{
        const userId = req.user._id
        console.log(userId)
        let userdata = await user.findById(userId).select("userName email phoneNumber address")

        if(!userdata){
            return next(new Error("user not found"))
        }

        res.status(200).send({
            success : true,
            userdata
        })


    }
    catch(err){
        return next(new Error("Error getting profile data"))
    }
}



export const updateProfile = async (req, res, next)=>{
    try{
        const userId = req.user._id
        const {userName , email, address, phoneNumber} = req.body

        if(!userName && !email && !address && !phoneNumber) {
            return next(new Error("please fill the fields"))
        }

        const data = {}

        if(userName) data.userName = userName
        if(email) data.email = email
        if(address) data.address = address
        if(phoneNumber) data.phoneNumber = phoneNumber

        let userdata = await user.findByIdAndUpdate(userId, {
           $set :  data
        }, {new : true}).select("+phoneNumber")

        if(!userdata){
            return next(new Error("user not found"))
        }

        res.status(200).send({
            success : true,
            userdata
        })


    }
    catch(err){
        return next(new Error("Error getting profile data"))
    }
}


export const getStates = async(req, res, next)=>{
    const userId = req.user._id

    const totalOrder = await order.countDocuments({user : userId})

    const totalList = await wishlist.findOne({userId})

    const totalfav = totalList ? totalList.items.length : 0

    res.status(200).json({
        success  : true,
        states : {
            totalOrder : totalOrder,
        totalfav : totalfav
        }
        
    })
}



export const forgetPassword = async (req, res , next)=>{
try{

    const { email } = req.body

    const data = await user.findOne({email})

    if(!data){
        return next(new Error("please enter vaild email"))
    }

    if(data.isbanned){
        return(next(new Error("user is banned please contact to support . ")))
    }

    const resetPasswordToken = data.generateResetPasswordToken()

     await data.save({validateBeforeSave : false
    })

    const resetpasswordUrl = `http://localhost:3000/api/v1/auth/reset/${resetPasswordToken}`

    await sendEmail({email : email, subject : "reset password", message : `<h1>${resetpasswordUrl}<h1/>`})

    res.status(200).json({
        success : true,
        message : `email sent to ${email} successfully`
    })

}
catch(err){
    if(data){
        data.resetPasswordToken = undefined,
        data.resetPasswordTokenExpire = undefined,
        await data.save({validateBeforeSave : false})
    }
        return next(new Error("failed to send email", err))

}
}


export const resetPassword = async (req, res , next)=>{
try{
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if(!newPassword || !confirmNewPassword){
        return next(new Error("please enter all the fields !"))
    }

    if(newPassword !== confirmNewPassword){
        return next(new Error("password doesn't match !"))
    }

    if(newPassword.length <8){
        return next(new Error("password must be 8 character"))
    }

    const resetPasswordToken = await crypto.createHash('sha256').update(token).digest('hex')
    const data = await user.findOne({resetPasswordToken : resetPasswordToken, 
        resetPasswordTokenExpire : {$gte : Date.now()}}).select("+password")

    if(!data){
        return next(new Error("invaild token or token had expired !"))
    }

    if(data.isbanned){
        return(next(new Error("user is banned please contact to support . ")))
    }

    const password = await bcrypt.hash(newPassword, 10)

    data.password = password;
    data.resetPasswordToken = undefined;
    data.resetPasswordTokenExpire = undefined;

    await data.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : `password changed successfully !`
    })

}
catch(err){
    if(data){
        data.resetPasswordToken = undefined,
        data.resetPasswordTokenExpire = undefined,
        await data.save({validateBeforeSave : false})
    }
        return next(new Error("failed to reset password", err))

}
}

export const updatePassword = async (req, res , next)=>{
    try{

        const userId = req.user._id
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmNewPassword){
        return next(new Error("please enter fill all the fields !"))
    }

    const data = await user.findById({_id : userId}).select("+password")

    const oldHasPassword = await bcrypt.compare(oldPassword, data.password)

    if(!oldHasPassword){
        return next(new Error("old pass is invalid"))
    }

    if(newPassword !== confirmNewPassword){
        return next(new Error("password not matched !"))
    }

    if(newPassword.length < 8){
        return next(new Error("password must be 8 character"))
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    data.password = hashPassword

    await data.save()

    res.send({
        success : true,
        data
    })

    }
    catch(err){
        return next(new Error("failed to change password !"))
    }
    
}