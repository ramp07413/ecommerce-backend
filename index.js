import express from 'express'
import { productRouter } from './routes/productRoute.js'
import { connectDB } from './database/db.js'
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger-output.json' assert { type: "json" };
import cors from 'cors'
import { userRouter } from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import { cartRouter } from './routes/cartRoute.js';
import { catogoryRouter } from './routes/categoryRoute.js';
import { wishistRouter } from './routes/wishlistRoute.js';
import { orderRouter } from './routes/orderRoute.js';
import ejs from 'ejs'
import { adminRouter } from './routes/adminRoute.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { notificationRouter } from './routes/notificationRoute.js';
import { whatsappRouter } from './routes/whatsappRoute.js';
import { emailRouter } from './routes/emailRoute.js';
import { employeeRouter } from './routes/employeeRoute.js';
import { departmentRouter } from './routes/departmentRoute.js';
import { couponRouter } from './routes/couponRoute.js';
import { invoiceRouter } from './routes/invoiceRoute.js';
import { datemodify } from './testing.js';
import { transactionRouter } from './routes/transactionRoute.js';



const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.use(cors({
  origin: 
    'https://testapix.netlify.app',
  
  credentials : true
}));



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req,res)=>{
    res.render("index")
})

app.use("/api/v1/product", productRouter)
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/category", catogoryRouter)
app.use("/api/v1/wishlist", wishistRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/notification", notificationRouter)
app.use("/api/v1/whatsapp", whatsappRouter)
app.use("/api/v1/email", emailRouter)
app.use("/api/v1/employee", employeeRouter)
app.use("/api/v1/department", departmentRouter)
app.use("/api/v1/coupon", couponRouter)
app.use("/api/v1/invoice", invoiceRouter)
app.use("/api/v1/transaction", transactionRouter)
app.use(errorMiddleware)


datemodify()

app.listen(3001, ()=>{
    console.log("it's running...")
})