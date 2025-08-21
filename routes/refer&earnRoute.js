import { Router } from "express";
import { allReferData, myReferData, OneUserReferData, referDashboardData } from "../controller/refer&earnController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/myrefer",isAuthenticated, myReferData)
router.get("/allrefer",isAuthenticated, allReferData)
router.get("/userrefer/:id",isAuthenticated, OneUserReferData)
router.get("/referDashboard",isAuthenticated, referDashboardData)

export {router as referearnRouter}