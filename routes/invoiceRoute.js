import { Router } from "express";
import { createInvoice, downloadInvoice, getInvoice } from "../controller/invoiceController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/get", getInvoice)
router.post("/create",isAuthenticated, createInvoice)
// router.patch("/update", updateInvoice)
router.get("/download/:id", downloadInvoice)



export {router as invoiceRouter}