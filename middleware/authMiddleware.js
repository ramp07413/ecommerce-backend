import jwt from 'jsonwebtoken'
import { user } from '../model/userModel.js';


export const  isAuthenticated = async(req, res, next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        return next(new Error("user is not authenticated."))
    }

    const decoded = jwt.verify(token, "secret")
    const data = await user.findById(decoded.id)
    if(!data){
        return next(new Error("user not found !"))
    }

    req.user = data;
    next()

    }
    catch(err){
        return next(new Error("internal server error"))
    }
   
}

export const  isAuthorized = (...role)=>{
    return(req, res , next)=>{
        if(!role.includes(req.user.role)){
            return next(new Error(`user with this role ${req.user.role} not allowed to access this resource `))
        }
        next()
    }
}