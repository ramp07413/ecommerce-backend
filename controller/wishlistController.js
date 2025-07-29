import { wishlist } from "../model/wishlistModel.js"

export const addToWishlist = async(req, res, next)=>{
    try{

        const {productId} = req.body
    const userId = req.user._id

    const data = await wishlist.findOne({userId})

    if(!data){
        data = new wishlist({
            userId,
            items : [
                {productId}
            ]
        })
    }
    else{
        const existWishlist = wishlist.items.some(item=> item.productId.equals(productId))

        if(existWishlist){
            return next(new Error("item is already in wish list"))
        }
        data.items.push({productId})
    }
    
    await data.save()

    res.status(200).send({
        success : true,
        message : "item added in wish list",
        wishlist : data
    })

    }
    catch(err){
        return next(new Error("Error adding to wish list"))
    } 
}

export const removeToWishlist = async(req, res, next)=>{
    try{
        const userId = req.user._id
        const {productId} = req.body

        const data = await wishlist.findOne({userId})

        data.items = data.items.filter(item => !item.productId.equals(productId))

        await data.save()

        res.status(200).send({
            success : true,
            message : "item removed from wishlist",
            wishlist : data
        })
    }
    catch(err){
        return next(new Error("Error in removing item"))
    }
}

export const getWishlist = async(req, res, next)=>{
    try{
 const userId = req.user._id;
    
    const data = await wishlist.findOne({userId}).populate("items.productId")

    if(!data){
      return res.status(200).send({
        success : true,
        wishlist : []
      })
    }

    res.status(200).send({
        success : true,
        wishlist : data
    })
    }
    catch(err){
        return next(new Error("Error in data fetching..."))
    }
   
}