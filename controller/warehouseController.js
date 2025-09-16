import { warehouse } from "../model/warehouseModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"

export const createWarehouse = async (req, res, next)=>{
    try {

        const { name , location, warehouseNo, managerId} = req.body

        if(!name || !location || !warehouseNo || !managerId){
            return next(new ErrorHandler("please fill all the filled !", 400))
        }

        const iswarehouseExits = await warehouse.findOne({warehouseNo : warehouseNo})

        if(iswarehouseExits){
            return next(new ErrorHandler("warehouse already exits with this No"))
        }

        const warehouseData = await warehouse.create({
            name : name,
            location : location,
            warehouseNo : warehouseNo,
            manager : managerId
        })

        await warehouseData.save()

        res.status(200).json({
            success : true,
            warehouseData
        })        
    } catch (err) {
        console.error(err)
        next(new ErrorHandler(err.message, 500))
    }
}



export const getOneWarehouse = async (req, res, next)=>{
    try {

        const warehouseNo = req.params.No

        if(!warehouseNo){
            return next(new ErrorHandler("no warehouse found", 404))
        }
      
        const warehouseData = await warehouse.findOne({warehouseNo : warehouseNo}).populate("manager", 'userName email role')


        res.status(200).json({
            success : true,
            warehouseData
        })        
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(err.message, 500))
    }
}

export const getAllWarehouse = async (req, res, next)=>{
    try {
        const warehouseData = await warehouse.find({}).populate("manager", 'userName email role')
        res.status(200).json({
            success : true,
            warehouseData
        })        
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(err.message, 500))
    }
}


export const editWarehouse  = async (req, res, next)=>{
    try {
        const warehouseNo = req.params.No
        const {name , location , managerId} = req.body

        if(!name && !location && !managerId){
            return next(new ErrorHandler("please fill atleast one field !", 400))
        }

        const warehouseData = await warehouse.findOne({warehouseNo : warehouseNo}).populate("manager", 'userName email role')

        if(!warehouseData){
            return next(new ErrorHandler("warehouse not found ",  404))
        }

        if(name) warehouseData.name = name
        if(location) warehouseData.location = location
        if(managerId) warehouseData.manager = managerId

        await warehouseData.save()

        res.status(200).json({
            success : true,
            warehouseData
        })
        
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler(err.message, 500))
    }
}

// product management in warehouse

// export const