import mongoose from "mongoose"
import { invoice } from "../model/invoiceModel.js"
import { order } from "../model/orderModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"
import PDFDocument from 'pdfkit'
// import { fillColor } from "pdfkit/js/mixins/color"


const generateInvoiceNumber = async()=>{
    const date = new Date()
    const yyyymmdd = date.toISOString().slice(0,10).replace(/-/g, "")
    const random = Math.floor(1000 * Math.random() * 9000)
    return `INV-${yyyymmdd}-${random}`
}

export const createInvoice = async (req, res, next)=>{
    try {
        const userId = req.user._id

        const { orderId } = req.body || {}

        if(!orderId){
            return next(new ErrorHandler("req.body is required !",400))
        }

        const orderData = await order.findOne({_id : orderId}).populate("orderItems.product", 'name price discount').select('orderItems OrignalAmount productPrice finalAmount shippingAddress shippingStatus paymentStatus')

        const invoiceItem = []

        const AlreadyInvoice = await invoice.findOne({orderId})

        if(AlreadyInvoice){
            return next(new ErrorHandler("invoice already created !", 200))
        }

        for(let item of orderData.orderItems ){
            invoiceItem.push({
                productName : item.product.name,
                quantity : item.quantity,
                price : item.product.price,
                discount : item.product.discount
            })
        }
        const invoiceNumber = await generateInvoiceNumber()


        const invoiceData = await invoice.create({
            invoiceNumber,
            orderId,
            userId,
            shippingAddress : orderData.shippingAddress,
            items : invoiceItem,
            subTotal : orderData.productPrice,
            couponDiscount : orderData.couponDiscount,
            grandTotal : orderData.finalAmount,
            orderDate : Date(orderData.createdAt),
        })

        await invoiceData.save()
        res.status(200).json({
            success : true,
            message : "invoice created successfully !",
            invoiceData
        })

        
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to create invoice", 500))
    }
}

export const getInvoice = async(req, res, next)=>{
    try {
        const { orderId } = req.body || {}

        if(!orderId){
            return next(new ErrorHandler("req.body is required !", 400))
        }

        const data = await invoice.findOne({orderId})

        if(!data){
            return next(new ErrorHandler("invaid orderId or invoice not available", 404))
        }

        res.status(200).json({
            success  : true,
            data
        })
        
    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to get invoice ", 500))
    }
}


export const downloadInvoice = async(req, res, next)=>{
    try {
       const orderId = req.params.id 
       if(!mongoose.Types.ObjectId.isValid(orderId)){
        return next(new ErrorHandler("req.params required", 400))
       }

       const data = await invoice.findOne({orderId}).populate('userId', 'userName phoneNumber')
       console.log(data)
        let doc = new PDFDocument({margin : 25})
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf')
        res.setHeader('content-Type', 'application/pdf')
        doc.pipe(res)

        doc.font('Times-Bold')
        .fontSize(30)
        .fillColor('red')
        .text("Tax Invoice", {
            align : "center",
        })
       
        .moveDown(0.5)
        
        doc.font('Times-Roman').fontSize(15)
        .fillColor('black')
        .text(`Sold By - ${data.userId.userName}`, {
            align : "left"
        })
        .fontSize(15)
         .text(`Ship-from Address - ${data.shippingAddress.street}, ${data.shippingAddress.city},${data.shippingAddress.state},${data.shippingAddress.country}, ${data.shippingAddress.postalCode},  `, {
            align : "left", width : 200
        })
         .fontSize(15)
         .text(`GSTIN - ${data.GSTIN}  `, {
            align : "left",
        })
         .fontSize(15)
         .text(`Invoice Number - ${data.invoiceNumber}  `, {
            align : "right",
        })
        .moveDown()


    doc.moveTo(0, doc.y) 
   .lineTo(1000, doc.y) 
   .stroke()
   .moveDown();

      doc.fontSize(13).table({
        rowStyles :{border : false},
        columnStyles : [200, '*', '*', '*'],
        data : [
            ["Order ID", "Bill To", "Ship To", ""],
            [`${data.orderId}`, `${data.userId.userName}`, `${data.userId.userName}`, ``],
            [`${(data.orderDate)}`, `${data.shippingAddress.street},${data.shippingAddress.city}`, `${data.shippingAddress.street},${data.shippingAddress.city}`, ``],
            [`${data.invoiceDate}`, `${data.shippingAddress.state},${data.shippingAddress.country}`, `${data.shippingAddress.state},${data.shippingAddress.country}`, {rowspan : 4, text : "this is unoriginated text please ignore if you are not interested", fillColor : 'red' },],
            [`${data.PAN}`, `${data.shippingAddress.postalCode}`, `${data.shippingAddress.postalCode}`, ``],
            
        ]
      })
      .moveDown()
      .text(`Total item : ${data.items[0].quantity}`)
      
    doc.moveTo(0, doc.y)
    .lineTo(1000, doc.y)
    .stroke()
    .moveDown()

    let rows = []

            
    rows.push(["Product", "Title", "Qty", "Gross Amount", "discount", "Total"])
    for(let item of data.items){
        rows.push([`${item.productName}`,`${item.productName}`, `${item.quantity}`, `${item.price}`, `${item.discount}`, `${item.price * item.quantity}` ])
    }


     doc.fontSize(13).table({
        rowStyles :{border : false},
        // columnStyles : [200, '*', '*', '*'],
        data : rows
      })

      doc.moveTo(0, doc.y)
    .lineTo(1000, doc.y)
    .stroke()
    .moveDown(3)

    doc.fontSize(20).fillColor("black")
    .text(`Grand Total : ${data.grandTotal}`, {
        align : "right"
    })
    .moveDown(3)
    .fontSize(20)
    .text("Authority sign", {
        align : "right"
    })
    .moveDown(5)

    .fontSize(18)
    .text("Thank you", {
        align : "right"
    })
    .fontSize(14)
    .text("for shoping", {
        align : "right"
    })
       
        doc.end()

    } catch (err) {
        console.error(err)
        return next(new ErrorHandler("failed to get invoice ", 500))
    }
}