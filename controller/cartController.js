import { Cart } from "../model/cartModel.js"

export const addToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId, quantity} = req.body

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
            existingItem.quantity += quantity
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
        return next(new Error("internal server error !"))
    }
}

export const getToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id

        let cart = await Cart.findOne({userId}).populate("items.productId")

        if(!cart){
            return next(new Error("cart not found !"))
        }

        res.status(200).send({
            success : true,
            cart
        })

    }
    catch(err){
        return next(new Error("internal server error !"))
    }
}


export const removeToCart = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId} = req.body

        let cart = await Cart.findOne({userId}).populate("items.productId")

        if(!cart){
            return next(new Error("cart not found !"))
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId))

        await cart.save()

        res.status(200).send({
            success : true,
            cart
        })

    }
    catch(err){
        return next(new Error("internal server error !"))
    }
}


export const updateCartItemQuantity = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId, quantity} = req.body

        if(!productId || !quantity){
            return next(new Error("please provide vaild quantity"))
        }

        let cart = await Cart.findOne({userId})

        if(!cart){
            return next(new Error("cart not found !"))
        }

        let item = cart.items.find(item => item.productId.equals(productId))


        if(!item){
            return next(new Error("product not found in card !"))
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
        return next(new Error("internal server error !"))
    }
}

