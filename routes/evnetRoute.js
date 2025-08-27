import { Router } from "express";
import { activeEvent, createEvent, getEvents, stopAllevent, stopOneEvent, updateEvent } from "../controller/eventController.js";


const router = Router()

router.post("/create", createEvent)
router.patch("/update/:id", updateEvent) 
router.get("/getEvents", getEvents)
router.post("/stopall", stopAllevent)
router.post("/stop/:id", stopOneEvent)
router.post("/active/:id", activeEvent)


export {router as eventRouter}