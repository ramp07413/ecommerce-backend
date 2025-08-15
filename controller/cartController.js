import { Cart } from "../model/cartModel.js"
import { productDetails } from "../model/productModel.js";
import { ErrorHandler } from "../utils/Errorhandler.js";

export const addToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId, quantity, couponCode} = req.body

        if(!productId || !quantity){
            return next(new ErrorHandler("please fill all the fields !"))
        }        

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({
                userId, items :[{
                    productId, quantity
                }]
            })
        }

      


        const existingItem = cart.items.find(item => item.productId.equals(productId))

        if(existingItem){
            existingItem.quantity = quantity
        }
        else{
            cart.items.push({
                productId, quantity
            })
        }

        await cart.save()

        res.status(200).send({
            success : true,
            message : "item added to cart",
            cart
        })

        
    }
    catch(err){
        console.error(err)
        return next(new ErrorHandler("internal server error !", 500))
    }
}

export const getToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id

        let cart = await Cart.findOne({userId}).populate("items.productId")
        if(!cart){
            return next(new ErrorHandler("cart is empty !", 200))
        }

        let totalprice = 0
        let total_discount = 0
        let totalamount = 0
        
        cart.items.forEach((item)=>{
            total_discount += parseInt((item.productId.price*item.productId.discount*item.quantity)/100)
            totalamount += parseInt(item.productId.price*item.quantity)
        })

        totalprice = totalamount - total_discount 
        totalprice -= parseInt(totalprice*cart.couponDiscount/100)
       


        
        res.status(200).send({
            success : true,
            cart,
            orignalprice : totalamount,
            totalAmount : totalprice, 
            discount : total_discount,
            couponDiscount : parseInt(totalamount*cart.couponDiscount/100)
        })

    }
    catch(err){
        console.error(err)
        return next(new ErrorHandler("internal server error !", 500))
    }
}


export const removeToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId} = req.body

        let cart = await Cart.findOne({userId}).populate("items.productId")

        if(!cart){
            return next(new ErrorHandler("cart not found !", 404))
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId))

        await cart.save()

        res.status(200).send({
            success : true,
            cart
        })

    }
    catch(err){
        return next(new ErrorHandler("internal server error !", 500))
    }
}


export const updateCartItemQuantity = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId, quantity} = req.body

        if(!productId || !quantity){
            return next(new ErrorHandler("please provide vaild quantity", 400))
        }

        let cart = await Cart.findOne({userId})

        if(!cart){
            return next(new ErrorHandler("cart not found !", 404))
        }

        let item = cart.items.find(item => item.productId.equals(productId))


        if(!item){
            return next(new ErrorHandler("product not found in card !", 404))
        }

        if(quantity<=0){
            cart.items = cart.items.filter(item=>!item.productId.equals(productId))
        }
        else{
            item.quantity = quantity
        }

        await cart.save()

        res.status(200).send({
            success : true,
            cart
        })

    }
    catch(err){
        return next(new ErrorHandler("internal server error !", 500))
    }
}


export const clearCart = async(req, res, next)=>{
    try{
        const userId = req.user._id

        let cart = await Cart.findOneAndDelete({userId})

        if(!cart){
            return next(new ErrorHandler("cart already cleared !", 200))
        }
        res.status(200).send({
            success : true,
            message : "cart is cleared !"
        })

    }
    catch(err){
        return next(new ErrorHandler("internal server error !", 500))
    }
}

