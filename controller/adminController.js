import { user } from "../model/userModel.js"

export const getAllUsers = async(req, res, next)=>{
    try{
        const data = await user.find({})
        res.status(200).json({
        success : true,
        data
    })
    }catch(err){
        return next(new Error("something went wrong !"))
    }
    
}

export const banuser  = async(req, res, next)=>{
    try{
        const userId = req.params.id
        console.log(userId)
        let data = await user.findById(userId)

        if(!data){
            return next(new Error("please enter valid user id"))
        }

        data.isbanned = !data.isbanned
        console.log(data.isbanned)

        await data.save()
        res.status(200).json({
            success : true,
            message : `user ${data.isbanned ? 'banned' : "unbanned"} successfully !`,
            data
        })

        
    }catch(err){
        console.error(err)
        return next(new Error("something went wrong !"))
    }
}


export const deleteUser = async(req, res, next)=>{
    try{
        const userId = req.params.id
        let data = await user.findByIdAndDelete(userId)

        if(!data){
            return next(new Error("please enter valid user id"))
        }

       
        res.status(200).json({
            success : true,
            message : "user deleted successfully !",
            data
        })

        
    }catch(err){
        console.error(err)
        return next(new Error("something went wrong !"))
    }
}



export const roleChange = async(req, res, next)=>{
    try{
        const userId = req.params.id
        const {role} = req.body
        let data = await user.findById(userId)

        if(!data){
            return next(new Error("please enter valid user id"))
        }

        if(data.isbanned){
            return next(new Error("user is banned !"))
        }

        data.role = role

        await data.save()
       
        res.status(200).json({
            success : true,
            message : `user update role is ${data.role} !`,
            data
        })

        
    }catch(err){
        console.error(err)
        return next(new Error("something went wrong !"))
    }
}


