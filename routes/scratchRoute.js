import { Router } from "express";
import { myScratch, Scratchreward } from "../controller/scratchCardController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/myscratch",isAuthenticated, myScratch)
router.post("/scratch/:id",isAuthenticated, Scratchreward)


export { router as scratchRouter}