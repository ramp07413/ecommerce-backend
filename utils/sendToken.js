export const sendToken = (data, code, message, req, res)=>{
    const token = data.generateToken()
    const user = {
        id : data._id,
        userName : data.userName,
        email : data.email,
        role : data.role
    }
    res.status(code).cookie("token", token).json({
        success : true,
        user,
        message,
        token
    })
}