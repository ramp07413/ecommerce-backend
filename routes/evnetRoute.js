import { Router } from "express";
import { createEvent, getEvents, updateEvent } from "../controller/eventController.js";


const router = Router()

router.post("/create", createEvent)
router.patch("/update/:id", updateEvent) 
router.get("/getEvents", getEvents)


export {router as eventRouter}