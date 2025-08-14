import { Router } from "express";
import { applyCoupon, createCoupon, deleteCoupon, editCoupon, getCoupon, removeCoupon } from "../controller/couponController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/get", getCoupon)
router.post("/create",isAuthenticated, createCoupon)
router.patch("/edit/:id", editCoupon)
router.delete("/delete/:id", isAuthenticated, deleteCoupon)
router.post("/applyCoupon",isAuthenticated, applyCoupon)
router.post("/removeCoupon",isAuthenticated, removeCoupon)


export  {router as couponRouter}