import { Router } from "express";

const router = Router();

router.post("/sendAll", sendEmailToAllUsers)
router.post("/send/:userId", sendEmailToAllUsers)
router.post("/support", SendEmailToSupportTeam)