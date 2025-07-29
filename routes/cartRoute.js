import { Router } from "express";
import { addToCart, getToCart, removeToCart, updateCartItemQuantity } from "../controller/cartController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", isAuthenticated ,addToCart)
router.get("/get", isAuthenticated, getToCart)
router.patch("/remove", isAuthenticated, removeToCart)
router.post("/update", isAuthenticated, updateCartItemQuantity)



export {router as cartRouter}