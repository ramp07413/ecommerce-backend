import { Router } from "express";
import { forgetPassword, getStates, getUser, googleLogin, googleurl, resetPassword, updatePassword, updateProfile, userLogin, userLogout, userProfile, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
import { getProductByCategory } from "../controller/productController.js";
import { client } from "../utils/googletoken.js";
dotenv.config();


const router = Router()



router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/google",googleurl)
router.patch("/updatePassword", isAuthenticated, updatePassword)
router.get("/google/callback", googleLogin)
router.get("/me", isAuthenticated ,getUser)
router.get("/logout", userLogout)
router.post("/forget", forgetPassword)
router.get("/profile", isAuthenticated, userProfile)
router.put("/update", isAuthenticated, updateProfile)
router.put("/reset/:token", resetPassword)
router.get("/user-states", isAuthenticated, getStates)


export {router as userRouter}