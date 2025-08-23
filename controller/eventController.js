import mongoose from "mongoose"
import { event } from "../model/eventModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"



export const getEvents = async (req, res , next)=>{
    try {
    const data = await event.find({})

    res.status(200).json({
        success : true,
        results : data.length,
        data
    })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))

    }
}

export const createEvent = async (req, res , next)=>{
    try {
        const { 
             eventName, 
                eventType,
                description, 
                startDate, 
                endDate, 
                discount, 
                maxDiscountAmount, 
                minPurchaseAmount, 
                products, 
                categories,
                bannerUrl,  
                priority 
         } = req.body || {}

    if(!req.body){
        return next(new ErrorHandler("required req.body", 400))
    }

    if( !eventName || 
        !description || 
        !startDate || 
        !endDate || 
        !maxDiscountAmount|| 
        !minPurchaseAmount|| 
        !products || 
        !categories ){
            return next(new ErrorHandler("please all the fields !", 400))
        }

        const data = await event.create({
                eventName, 
                eventType,
                description, 
                startDate, 
                endDate, 
                discount, 
                maxDiscountAmount, 
                minPurchaseAmount, 
                products, 
                categories,
                bannerUrl,  
                priority 
        })

        await data.save()

    res.status(200).json({
        success : true,
        message : `event ${eventName} created !`,
        data
    })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))

    }
}


export const updateEvent = async (req, res , next)=>{
    try {
        const eventId = req.params.id

        if(!eventId){
            return next (new ErrorHandler("event Id is required !", 400))
        }

        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return next(new ErrorHandler("event Id is invalid !", 400))
        }
        const { 
             eventName, 
                eventType,
                description, 
                startDate, 
                endDate, 
                discount, 
                maxDiscountAmount, 
                minPurchaseAmount, 
                products, 
                categories,
                bannerUrl,  
                priority 
         } = req.body || {}

    if(!req.body){
        return next(new ErrorHandler("required req.body", 400))
    }

    if( !eventName && 
        !description && 
        !startDate && 
        !endDate && 
        !discount && 
        !maxDiscountAmount&& 
        !minPurchaseAmount&& 
        !products && 
        !categories ){
            return next(new ErrorHandler("please at least one field !", 400))
        }

        const data = await event.findOne({})

                eventName, 
                eventType,
                description, 
                startDate, 
                endDate, 
                discount, 
                maxDiscountAmount, 
                minPurchaseAmount, 
                products, 
                categories,
                bannerUrl,  
                priority 
        

        await data.save()

    res.status(200).json({
        success : true,
        message : `event ${data.eventName} updated !`,
        data
    })
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))

    }
}