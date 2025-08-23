import mongoose from "mongoose";
import { Cart } from "../model/cartModel.js";
import { notification } from "../model/notificationModel.js";
import { order } from "../model/orderModel.js";
import { productDetails } from "../model/productModel.js";
import { user } from "../model/userModel.js";
import { ErrorHandler } from "../utils/Errorhandler.js";

export const createOrder = async(req, res, next)=>{
    try{

    let totalAmount = 0
    let discountedPrice = 0
    let walletamount = 0
    
    const userId = req.user._id;
    const usercart = await Cart.findOne({userId})
    const {shippingAddress} = req.body 

    if(!usercart || usercart.items.length == 0){
        return next(new ErrorHandler("cart is empty !", 200))
    }

    console.log(usercart)

    const couponDiscount = usercart.couponDiscount

    console.log(couponDiscount)


    if(!shippingAddress ){
        return next(new ErrorHandler("please fill all the fields", 400))
    }

    const finalOrderitem = []

    const userData = await user.findOne({_id : userId})

    if(userData.isWalletApplied){
        walletamount = userData.walletBalance
    }

    for(let item of usercart.items){
    // console.log(item.productId)
    let product = await productDetails.findById(item.productId)
    if(!product){
        console.log(item.productId)
        return next(new ErrorHandler("product not found", 200))
    }

    // console.log(product)
    
    totalAmount += product.price*item.quantity
    
    finalOrderitem.push({
        product : item.productId,
        quantity : item.quantity
    })
    discountedPrice = parseInt(totalAmount -  (totalAmount*product.discount)/100);
    }

    let finalAmount = discountedPrice - walletamount;
    
    if(couponDiscount != 0){
        finalAmount =  discountedPrice - discountedPrice*couponDiscount/100
    }
    
    const data = await order.create({
       
        user : userId,
        orderItems :finalOrderitem,
        shippingAddress : shippingAddress,
        OrignalAmount : parseInt(totalAmount),
        productPrice : discountedPrice,
        finalAmount : parseInt(finalAmount),
        couponDiscount : couponDiscount,
        usedWalletAmount : walletamount,
        paymentStatus : "pending",
        shippingStatus : "processing"
    })

    await Cart.findOneAndDelete({userId})

    await notification.create({
        user : userId,
        title : "order created",
        message : "order confirmed !",
        type : "order"
    })

    if(walletamount != 0){
        userData.walletBalance = 0
        userData.isWalletApplied = false
        
        await userData.save()
    }

    res.status(201).json({
        success : true,
        message : "order confirmed !",
        data
    })
      }
      catch(err){
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))
      }
}

export const getMyorder = async(req, res, next)=>{
    try{
        const userId = req.user._id;
        const data = await order.find({user : userId}).populate('orderItems.product', 'name price discount').select('orderItems OrignalAmount productPrice finalAmount shippingAddress shippingStatus paymentStatus')

        if(!data){
            return next(new ErrorHandler("oder not found !", 404))
        }
        
        res.status(200).json({
            success : true,
            results : data.length,
            data
        })
    }
    catch(err){
        return next(new ErrorHandler("internal sever error !", 500))
    }

}

export const getAllorder = async(req, res, next)=>{
    try{
        const data = await order.find({}).populate("orderItems.product", 'name shopName price').populate("user")

    if(!data){
        return next(new ErrorHandler("no order is placed !", 404))
    }

    res.status(200).json({
        success : true,
        results : data.length,
        data
    })
    }
    catch(err){
        return next(new ErrorHandler(`${err._message}`, 500))

    }
    
}


export const cancelOrder = async(req, res, next)=>{
    try{
        const userId = req.user._id;
    const {orderId} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return next(new ErrorHandler("invalid order id !", 400))
    }
    
    const shippingStatus = "cancelled";

   

    const data = await order.findOne({_id : orderId ,user : userId})

    if(!data){
        return next(new ErrorHandler("order not found", 404))
    }


    data.shippingStatus = shippingStatus;


    await data.save();

   
    res.status(200).json({
        success : true,
        message : "order cancelled successfully !",
        data
    })
    }
    catch(err){
        return next(new ErrorHandler(`${err._message}`, 500))

    }
    
}

 
export const updateOrder = async(req, res, next)=>{
    try{
    const {orderId} = req.params;
    const {shippingAddress, shippingStatus} = req.body || {};

    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return next(new ErrorHandler("invalid order id !", 400))
    }

    if(!shippingAddress && !shippingStatus){
        return next(new ErrorHandler("at least one field is required !", 400))
    }
    
    const data = await order.findOne({_id : orderId })

    if(!data){
        return next(new ErrorHandler("order not found", 404))
    }

    if(shippingAddress) data.shippingAddress = shippingAddress;
    if(shippingStatus) data.shippingStatus = shippingStatus;

    await data.save()
    res.status(200).json({
        success : true,
        message : "order updated successfully !",
        data
    })
     }
    catch(err){
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))

    }
    
}

export const recentOrder = async (req, res, next)=>{
    try{
    const userId = req.user._id

    const data = await order.find({user: userId}).sort({createdAt : -1}).populate('orderItems.product', 'name price shopName')

    if(!data || data.length === 0){
        return next(new ErrorHandler("no recent order found !", 404))
    }

    res.status(200).json({
        success : true,
        results : data.length,
        data        
    })
     }
    catch(err){
        return next(new ErrorHandler(`${err._message}`, 500))

    }
    
}