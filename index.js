import express from 'express'
import { productRouter } from './routes/productRoute.js'
import { connectDB } from './database/db.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: "json" };
import cors from 'cors'
import { userRouter } from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use(cors({
  origin: '*',
}));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req,res)=>{
    res.send("api call")
})

app.use("/api/v1/product", productRouter)
app.use("/api/v1/auth", userRouter)

app.use((err, req, res, next)=>{
    res.status(500).send({
        success : false,
        message : err.message
    })
})


app.listen(3001, ()=>{
    console.log("it's running...")
})