import express from 'express'
import { productRouter } from './routes/productRoute.js'
import { connectDB } from './database/db.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req,res)=>{
    res.send("api call")
})

app.use("/api/v1/product", productRouter)

app.use((err, req, res, next)=>{
    res.status(500).send({
        success : false,
        message : err.message
    })
})

connectDB()

app.listen(3001, ()=>{
    console.log("it's running...")
})