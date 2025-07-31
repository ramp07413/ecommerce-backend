import { sendToken } from "../utils/sendToken.js";
import { user } from "../model/userModel.js";
import bcrypt from 'bcrypt'


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
