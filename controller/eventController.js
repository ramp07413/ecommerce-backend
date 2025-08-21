import { event } from "../model/eventModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"

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
        !discount || 
        !maxDiscountAmount|| 
        !minPurchaseAmount|| 
        !products || 
        !categories ||
        !bannerUrl ||  
        !priority ){
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
        return next(new ErrorHandler("internal server error", 500))
    }
}