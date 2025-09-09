import { Router } from "express";
import { createReview, deleteReviews, getAllReviews, getReview, updateReview } from "../controller/reviewController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/create",isAuthenticated, createReview)
router.get("/Allreviews",isAuthenticated, getAllReviews)
router.get("/getreviews/:id",isAuthenticated, getReview)
router.patch("/update/:id",isAuthenticated, updateReview)
router.delete("/delete/:id" , deleteReviews)






export {router as reviewRouter}