import express from "express";
import { createRazorpayOrderAndVerify, verifyPaymentAndCreateOrder } from "../controller/razorpayController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createRazorpayOrderAndVerify);
router.post("/verify-payment", isAuthenticated, verifyPaymentAndCreateOrder);

export {router as razorpayRouter}