import { Router } from "express";
import { sendEmailToAllUsers, sendEmailTouser } from "../controller/emailController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/sendAll",isAuthenticated, isAuthorized("admin"), sendEmailToAllUsers)
router.post("/send/:userId", isAuthenticated, sendEmailTouser)


export {router as emailRouter}