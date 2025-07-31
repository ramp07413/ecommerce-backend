import { order } from "../model/orderModel.js";
import { productDetails } from "../model/productModel.js";

export const createOrder = async(req, res, next)=>{
    try{

    let totalAmount = 0
    const userId = req.user._id;
    const {orderItems, shippingAddress} = req.body 
    if(!orderItems || !orderItems.length || !shippingAddress ){
        return next(new Error("please fill all the fields"))
    }

    const finalOrderitem = []

    for(let item of orderItems){
    // console.log(item.productId)
    let product = await productDetails.findById(item.productId)
    if(!product){
        console.log(item.productId)
        return next(new Error("product not found"))
    }

    totalAmount += product.price*item.quantity;
        finalOrderitem.push({
            product : item.productId,
            quantity : item.quantity
        })
    }
    
    const data = await order.create({
       
        user : userId,
        orderItems :finalOrderitem,
        shippingAddress : shippingAddress,
        totalAmount,
        paymentStatus : "pending",
        shippingStatus : "processing"
    })

    res.status(201).json({
        success : true,
        message : "order confirmed !",
        data
    })
      }
      catch(err){
        console.error(err)
        return next(new Error("failed to place order !"))
      }
    
}

export const getMyorder = async(req, res, next)=>{
        const userId = req.user._id;
        const data = await order.find({user : userId}).populate('orderItems.product', 'name price').select('orderItems shippingAddress shippingStatus paymentStatus')

        if(!data){
            return next(new Error("oder not found !"))
        }
        
        res.status(200).json({
            success : true,
            data
        })
}

export const getAllorder = async(req, res, next)=>{
    const data = await order.find({}).populate("orderItems.product", 'name shopName price').populate("user")

    if(!data){
        return next(new Error("no order is placed !"))
    }

    res.status(200).json({
        success : true,
        data
    })
}


export const cancelOrder = async(req, res, next)=>{
    const userId = req.user._id;
    const {orderId} = req.params;
  
    
    const shippingStatus = "cancelled"

   

    const data = await order.findOne({_id : orderId ,user : userId})

    if(!data){
        return next(new Error("order not found"))
    }


    data.shippingStatus = shippingStatus


    await data.save()

   
    res.status(200).json({
        success : true,
        message : "order cancelled successfully !",
        data
    })
}

 
export const updateOrder = async(req, res, next)=>{
    const {orderId} = req.params;
    const {shippingAddress, shippingStatus} = req.body;
    if(!shippingAddress && !shippingStatus){
        return next(new Error("at least one field is required !"))
    }
    
    const data = await order.findOne({_id : orderId })

    if(!data){
        return next(new Error("order not found"))
    }

    await data.save()
    res.status(200).json({
        success : true,
        message : "order updated successfully !",
        data
    })
}

 