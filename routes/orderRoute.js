import { Router } from "express";
import { cancelOrder, createOrder, getAllorder, getMyorder, recentOrder, updateOrder } from "../controller/orderController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/my-order", isAuthenticated, getMyorder)
router.get("/all-order", isAuthenticated, isAuthorized("Admin"), getAllorder)
router.get("/recent-order", isAuthenticated, recentOrder)
router.post("/create", isAuthenticated, createOrder)
router.get("/cancel/:orderId", isAuthenticated, cancelOrder)
router.patch("/update/:orderId", isAuthenticated, isAuthorized("Admin"), updateOrder)




export {router as orderRouter}