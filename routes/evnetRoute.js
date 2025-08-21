import { Router } from "express";
import { createEvent } from "../controller/eventController.js";


const router = Router()

router.post("/create", createEvent)


export {router as eventRouter}