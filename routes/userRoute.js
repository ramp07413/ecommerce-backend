import { Router } from "express";
import { getUser, updateProfile, userLogin, userLogout, userProfile, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/me", isAuthenticated ,getUser)
router.get("/logout", userLogout)
router.get("/profile", isAuthenticated, userProfile)
router.put("/update", isAuthenticated, updateProfile)


export {router as userRouter}