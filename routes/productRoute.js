import { Router } from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/get", getProduct)
router.post("/add", isAuthenticated, isAuthorized("Admin"), addProduct)
router.put("/update/:id", isAuthenticated, isAuthorized("Admin"), updateProduct)
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteProduct )


export {router as productRouter}