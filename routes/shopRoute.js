import { Router } from "express";
import { isAuthenticated, isShopVerified } from "../middleware/authMiddleware.js";
import { createshop, disableShop, getAllShop, getMyShop, getOneShop, getShopProduct, myshopProduct, updateshopDetails } from "../controller/shopCotroller.js";

const router = Router()

router.get("/myshop",isAuthenticated, isShopVerified,  getMyShop)
router.get("/myshopProduct", isAuthenticated,isShopVerified, myshopProduct)
router.get("/allshop", getAllShop)
router.get("/Oneshop/:id",isAuthenticated, getOneShop)
router.get("/getShopProduct/:id", getShopProduct)
router.post("/create", isAuthenticated, createshop)
router.patch("/updateShop/:id",updateshopDetails)
router.patch("/disable/:id", disableShop)


export {router as shopRouter}