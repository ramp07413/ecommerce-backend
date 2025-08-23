import { Router } from "express";
import { cancelOrder, createOrder, getAllorder, getMyorder, recentOrder, updateOrder } from "../controller/orderController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/my-order", isAuthenticated, getMyorder)
router.get("/all-order", isAuthenticated, isAuthorized("admin"), getAllorder)
router.get("/recent-order", isAuthenticated, recentOrder)
router.post("/create", isAuthenticated, createOrder)
router.put("/cancel/:orderId", isAuthenticated, cancelOrder)
router.patch("/update/:orderId", isAuthenticated, isAuthorized("admin"), updateOrder)




export {router as orderRouter}