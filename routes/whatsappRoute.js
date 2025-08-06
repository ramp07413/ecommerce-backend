import { Router } from "express";
import { getConnectWhatsapp } from "../controller/whatsappController.js";

const router = Router()

router.post("/message", getConnectWhatsapp)

export {router as whatsappRouter }