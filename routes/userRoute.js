import { Router } from "express";
import { getStates, getUser, updateProfile, userLogin, userLogout, userProfile, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/me", isAuthenticated ,getUser)
router.get("/logout", userLogout)
router.get("/profile", isAuthenticated, userProfile)
router.put("/update", isAuthenticated, updateProfile)
router.get("/user-states", isAuthenticated, getStates)


export {router as userRouter}