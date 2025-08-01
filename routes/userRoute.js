import { Router } from "express";
import { getStates, getUser, googleLogin, googleurl, updateProfile, userLogin, userLogout, userProfile, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
import { getProductByCategory } from "../controller/productController.js";
import { client } from "../utils/googletoken.js";
dotenv.config();


const router = Router()



router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/google",googleurl)

router.get("/google/callback", googleLogin)
router.get("/me", isAuthenticated ,getUser)
router.get("/logout", userLogout)
router.get("/profile", isAuthenticated, userProfile)
router.put("/update", isAuthenticated, updateProfile)
router.get("/user-states", isAuthenticated, getStates)


export {router as userRouter}