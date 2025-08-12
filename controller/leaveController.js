import { leave } from "../model/leaveModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"

export const applyingLeave = async(req, res, next)=>{
    try {
        const userId = req.user._id
        const { 
            leaveType,
            from,
            to,
            description } = req.body
        
        if(!leaveType ||
            !from ||
            !to ||
            !description){
                return next(new ErrorHandler("please fill all the fields", 400))
            }

        const data = await new leave({
            user : userId,
            leaveType,
            from,
            to,
            description
        })

        await data.save()

        res.status(200).json({
            success : true,
            data
        })
              
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("something went wrong", 500))
    }
}


export const checkLeave = async(req, res, next)=>{
    try {
        const userId = req.user._id
        const { status } = req.query

        const filter = {user : userId}

        if(status){
            filter.status = status
        }
        
        const data = await leave.find(filter)

        if(!data){
            return next(new ErrorHandler("no leaves found !", 200))
        }

        res.status(200).json({
            success : true,
            results : data.length,
            data
        })
              
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("something went wrong", 500))
    }
}


export const checkLeaves = async(req, res, next)=>{
    try {

        const { status } = req.query

        const filter = {}

        if(status){
            filter.status = status
        }
      
        const data = await leave.find(filter)

        if(!data){
            return next(new ErrorHandler("no leaves found !", 200))
        }

        res.status(200).json({
            success : true,
            results : data.length,
            data
        })
              
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("something went wrong", 500))
    }
}



export const approveLeaves = async(req, res, next)=>{
    try {
        
        const {leaveId, status} = req.body

        const AllowedStatus = ["pending", "approved", "rejected"]

        if(!AllowedStatus.includes(status)){
            return next(new ErrorHandler("this status is not allowed !", 400))
        }

        const data = await leave.findOne({_id : leaveId})

        if(!data){
            return next(new ErrorHandler("invalid userid !", 200))
        }

        data.status = status
        data.save()
        res.status(200).json({
            success : true,
            data
        })
              
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("something went wrong", 500))
    }
}

