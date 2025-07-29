import { Router } from "express";
import { addToWishlist, getWishlist, removeToWishlist } from "../controller/wishlistController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/", isAuthenticated ,getWishlist)
router.post("/add", isAuthenticated, addToWishlist)
router.post("/remove",isAuthenticated, removeToWishlist)

export {router as wishistRouter}