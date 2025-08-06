import { Router } from "express";
import { clearNotifications, deleteNotification, getAllnotification, sendNotificationToAll } from "../controller/notificationController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()


router.get("/get",isAuthenticated, getAllnotification)
router.post("/create",isAuthenticated, isAuthorized("admin"), sendNotificationToAll)
router.delete("/delete/:id",isAuthenticated, deleteNotification)
router.delete("/clear",isAuthenticated, clearNotifications)

export {router as notificationRouter}