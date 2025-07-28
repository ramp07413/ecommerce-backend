import { Router } from "express";
import { addProduct, getProduct } from "../controller/productController.js";

const router = Router()

router.get("/get", getProduct)
router.post("/add", addProduct)


export {router as productRouter}