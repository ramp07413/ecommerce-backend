import { Router } from "express";
import { addProduct, getProduct } from "../controller/productController.js";

const router = Router()

router.get("/hello", getProduct)
router.post("/hi", addProduct)


export {router as productRouter}