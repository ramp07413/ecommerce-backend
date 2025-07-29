import { Router } from "express";
import { addCategory, getAllCategory, removeCategory } from "../controller/categoryController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/", isAuthenticated, isAuthorized("Admin"),getAllCategory)
router.post("/add", isAuthenticated, isAuthorized("Admin"),  addCategory)
router.delete("/:id", isAuthenticated, isAuthorized("Admin"), removeCategory)



export {router as catogoryRouter}