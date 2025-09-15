import { Router  } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { approveRequest, getAlltheRequests, getOneRequest, paymentRefund, refundPaymentToWallet, rejectRequest, returnRequest, updateRequest } from "../controller/returnController.js";


const router = Router()

router.post("/returnRequest", isAuthenticated, returnRequest)
router.get("/allRequest", isAuthenticated, getAlltheRequests)
router.get("/request/:id", isAuthenticated, getOneRequest)
router.post("/approveRequest", isAuthenticated, approveRequest)
router.patch("/rejectRequest", isAuthenticated, rejectRequest)
router.put("/updateRequest/:id", isAuthenticated, updateRequest)
// router.get("/allReturnedProduct", isAuthenticated, allReturnedProduct)
router.post("/refundToWallet", isAuthenticated, refundPaymentToWallet )
router.post("/refundToRazorpay", isAuthenticated, paymentRefund);



export {router as returnRouter}