import mongoose from "mongoose";
import { coupon } from "../model/couponModel.js";
import { ErrorHandler } from "../utils/Errorhandler.js";
import { Cart } from "../model/cartModel.js";

export const createCoupon = async (req, res, next)=>{
    try {
        const userId = req.user._id
        const {   
            couponTitle, 
            couponCode, 
            couponExpiry, 
            couponDiscount,
            useLimit
            } = req.body

        if( !couponTitle ||
            !couponCode ||
            !couponExpiry ||
            !couponDiscount ){
                return next(new ErrorHandler("please fill all the fields!", 400))
            }

             let data = await coupon.findOne({couponCode})
        
        if(data){
            return next(new ErrorHandler("coupon already exits !", 200))
        }


            // userLimit : {
            //         type : Number,
            //         default : null
            //     },
            //     userCount : {
            //         type : Number,
            //         default : 0
            //     },
            //     usedBy : [{
            //         type : mongoose.Schema.Types.ObjectId,
            //         ref : "user"
            //     }]

        data = await coupon.create({
            couponTitle,
            couponCode, 
            couponDiscount,
            couponExpiry : Date(couponExpiry),
            userBy : userId,
            useLimit
        })
    
        await data.save()
        res.status(200).json({
            success : true,
            data
        })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to create coupon", 500))
    }
}


export const editCoupon = async (req, res, next)=>{
    try {
        const couponId = req.params.id
        
        const {   
            couponTitle, 
            couponCode, 
            couponExpiry, 
            couponDiscount
            } = req.body || {}

        if( !couponTitle &&
            !couponCode &&
            !couponExpiry &&
            !couponDiscount ){
                return next(new ErrorHandler("at least one field is required !", 400))
            }
        if(!couponId) { 
            return next(new ErrorHandler("required couponId !", 400))
        }

        if(!mongoose.Types.ObjectId.isValid(couponId)){
            return next(new ErrorHandler("coupon id is invalid !", 400))
        }

       
       const data = await coupon.findOne({_id : couponId})

       if(!data){
        return next(new Error("coupon not found !", 404))
       }

       if(couponTitle) data.couponTitle = couponTitle
       if(couponCode) data.couponCode = couponCode
       if(couponExpiry) data.couponExpiry = couponExpiry
       if(couponDiscount) data.couponDiscount = couponDiscount

       
        await data.save()

        res.status(200).json({
            success : true,
            message : "coupon upadated successfully !",
            data
        })
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler("failed to update coupon", 500))
    }
}


export const getCoupon = async (req, res, next)=>{
    try {
        const data = await coupon.find({})
        res.status(200).json({
            success : true,
            data
        })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to get coupon", 500))
    }
}

export const deleteCoupon = async (req, res, next)=>{
    try {
        const couponId = req.params.id

        if(!couponId){
            return next(new ErrorHandler("give parameters", 400))
        }

        if(!mongoose.Types.ObjectId.isValid(couponId)){
            return next(new ErrorHandler("coupon id is invalid !"))
        }

        const data = await coupon.findOneAndDelete({_id : couponId}) 

        if(!data){
            return next(new ErrorHandler("coupon already deleted !", 200))
        }
    
        res.status(200).json({
            success : true,
            message : "coupon deleted successfully !"
        })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to delete coupon", 500))
    }
}


export const removeCoupon = async (req, res, next)=>{
    try {
        const { couponCode } = req.body
        const  userId = req.user._id

        if(!couponCode){
            return next(new ErrorHandler("give parameters", 400))
        }

       

        let data = await coupon.findOne({couponCode : couponCode}) 

        if(!data){
            return next(new ErrorHandler("coupon not found !", 404))
        }

        data = await Cart.findOne({userId})

        if(!data){
            return next(new ErrorHandler("cart not found !", 404))
        }

        data.couponDiscount = 0
        await data.save()
        res.status(200).json({
            success : true,
            message : "coupon removed successfully !"
        })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to remove coupon", 500))
    }
}

export const applyCoupon = async (req, res, next)=>{
    try {
        const userId = req.user._id
        const { couponCode } = req.body || { }
        if(!couponCode){
            return next(new ErrorHandler("parameter is required !", 400))
        }

        let data = await coupon.findOne({couponCode : couponCode})
        let discount = data.couponDiscount
        if(!data){
            return next(new ErrorHandler("coupon not found", 404))
        }

        data = await Cart.findOne({userId})
        data.couponDiscount = discount
        await data.save()
        res.status(200).json({
            success : true,
            message : "coupon applied successfully !"
        })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to get coupon", 500))
    }
}
