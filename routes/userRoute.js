import { Router } from "express";
import { getUser, userLogin, userLogout, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/me", isAuthenticated ,getUser)
router.get("/logout", userLogout)


export {router as userRouter}