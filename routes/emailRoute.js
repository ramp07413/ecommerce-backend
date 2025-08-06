import { Router } from "express";
import { sendEmailToAllUsers } from "../controller/emailController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/sendAll",isAuthenticated, isAuthorized("admin"), sendEmailToAllUsers)
// router.post("/send/:userId", sendEmailTouser)
// router.post("/support", SendEmailToSupportTeam)

export {router as emailRouter}