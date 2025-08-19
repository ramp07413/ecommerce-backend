import { invoice } from "./model/invoiceModel.js"

export const datemodify = async()=>{
    try {
        const orderId = "68a2b9cb0f0c2aba5df736e5"
        const data = await invoice.findOne({orderId})
        let date = data.orderDate.toISOString().slice(0,10).replaceAll("-", "/")
        console.log(date)
    } catch (err) {
        console.error(err)
    }
}

export const linkCreate = async()=>{
    try {
        const userId = ""
        const data =  await user.findOne({_id})
    } catch (err) {
        
    }
}

// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTMwODk3ODM5OTVkMDlkNzFkZGMzOSIsImVtYWlsIjoicmFtMjNAZ21haWwuY29tIiwiaWF0IjoxNzU1NTk1NDk2fQ.RmKIg_Dn88wtorI7WSaBi4W58TK3s9vjph7qw5ygoIM; Path=/; HttpOnly; Secure; SameSite=None