import express from 'express'
import { productRouter } from './routes/productRoute.js'
import { connectDB } from './database/db.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: "json" };
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

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.use(cors({
  origin: '*',
}));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use(errorMiddleware)


app.listen(3001, ()=>{
    console.log("it's running...")
})