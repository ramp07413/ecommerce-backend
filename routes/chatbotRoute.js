import { Router } from "express";
import { ask2Gemini, askGemini, closechat, gethistory, gethistorybyId } from "../controller/chatbotController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/ask",isAuthenticated, askGemini)
router.post("/ask2",isAuthenticated, ask2Gemini)

router.patch("/close",isAuthenticated, closechat)

router.get("/history",isAuthenticated, gethistory)

router.get("/history/:id", gethistorybyId)

export {router as chatbotRouter}