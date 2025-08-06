import { user } from "../model/userModel.js"

export const getConnectWhatsapp = async(req, res, next)=>{
    const { userId } = req.body

    const data = await user.findById({_id : userId})

    const base_link = `https://api.whatsapp.com/send?phone=91${data.phoneNumber}`

    console.log(base_link)
    
    res.send("success")
}