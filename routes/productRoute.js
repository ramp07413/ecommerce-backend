import { Router } from "express";
import { addProduct, getProduct } from "../controller/productController.js";

const router = Router()

router.get("/", getProduct)
router.post("/", addProduct)


export {router as productRouter}