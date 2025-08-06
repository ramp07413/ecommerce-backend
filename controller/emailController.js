import { emailDetails } from "../model/emailModel.js"
import { user } from "../model/userModel.js"
import { sendEmail, sendEmails } from "../utils/emailSend.js"
import { ErrorHandler } from "../utils/Errorhandler.js"


export const sendEmailToAllUsers = async(req, res, next)=>{
    try{

    
    const userId = req.user._id
    const {subject , message} = req.body

    if(!subject || !message){
        return next(new ErrorHandler("please fill all the fields ! ", 400))
    }

    const data = await user.find({}, "email")

    if(!data || data.length == 0){
        return next(new ErrorHandler("no email founds !", 400))
    }

    const emaillist = data.map((item)=>item.email)


    await emailDetails.create({
        sentBy : userId,
        emailList : emaillist,
        subject,
        message
    })

    await sendEmails({bcc : emaillist, subject, message})

    res.status(200).send({
        success : true,
        emaillist
    })
}
catch(err){
    console.error(err)
    return next(new ErrorHandler("failed to send emails !", 500))
}

}

export const sendEmailTouser = async(req, res, next)=>{
    try{

    
    const userId = req.user._id
    const {subject , message} = req.body

    if(!subject || !message){
        return next(new ErrorHandler("please fill all the fields ! ", 400))
    }

    const data = await user.findById(userId)

    if(!data){
        return next(new ErrorHandler("no email founds !", 400))
    }




    await emailDetails.create({
        sentBy : userId,
        email : data.email,
        subject,
        message
    })

    await sendEmail({email, subject, message})

    res.status(200).send({
        success : true,
        emaillist
    })
}
catch(err){
    console.error(err)
    return next(new ErrorHandler("failed to send emails !", 500))
}

}