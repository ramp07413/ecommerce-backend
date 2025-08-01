import { sendToken } from "../utils/sendToken.js";
import { user } from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { order } from "../model/orderModel.js";
import { wishlist } from "../model/wishlistModel.js";
import { client, googleresponse } from "../utils/googletoken.js";


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

export const updatePassword = async (req, res , next)=>{
    const userId = req.user._id
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmNewPassword){
        return next(new Error("please enter fill all the fields !"))
    }

    const data = await user.findById({_id : userId}).select("+password")

    res.send({
        success : true,
        data
    })



}