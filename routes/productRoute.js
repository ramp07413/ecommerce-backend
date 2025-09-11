import { Router } from "express";
import { addProduct, deleteProduct, filterProduct, getProduct, getProductByCategory, updateProduct } from "../controller/productController.js";
import { isAuthenticated, isAuthorized, isShopVerified } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = Router()

router.get("/get", getProduct)
router.get("/get/:categoryId", getProductByCategory)
router.post("/add", isAuthenticated,upload.array('images', 10), isShopVerified,addProduct)
router.put("/update/:id", isAuthenticated, isAuthorized("admin"), updateProduct)
router.patch("/updateOne/:id", isAuthenticated, isAuthorized("admin"), updateProduct)
router.delete("/delete/:id", isAuthenticated, isAuthorized("admin"), deleteProduct )
router.get("/filter", isAuthenticated, filterProduct)

export {router as productRouter}