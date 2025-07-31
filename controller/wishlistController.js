import { wishlist } from "../model/wishlistModel.js"

export const addToWishlist = async(req, res, next)=>{
    try{

        const {productId} = req.body
    const userId = req.user._id

    if(!productId){
        return next(new Error("please enter valid product id"))
    }

    let data = await wishlist.findOne({userId})

    if(!data){
        data = new wishlist({
            userId,
            items : [
                {productId}
            ]
        })
    }
    else{
        const existWishlist = data.items.some(item=> item.productId.equals(productId))

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

        if(!productId){
            return next(new Error("product id invalid"))
        }

        const data = await wishlist.findOne({userId})

        if(!data){
            return next(new Error("wishlist not found"))
        }

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

export const recentFav = async (req, res, next)=>{
    const userId = req.user._id

    const data = await wishlist.findOne({userId}).populate({
        path : 'items.productId', 
        // select : 'name shopeName price itemTag shippingTag',
        populate : {
        path : 'userId',
        select : 'userName email role'
    }
} )

    if(!data){
        return next(new Error("no recent fav found !"))
    }

    data.items.sort((a, b)=>{
        return new Date(b.productId.createdAt) - new Date(a.productId.createdAt)
    })

    res.status(200).json({
        success : true,
        data
    })
}

