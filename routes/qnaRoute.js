import { Router  } from "express";
import { createQNA, deleteQNA, getOneQNA, getQNA, updateQNA } from "../controller/qnaController.js";

const router = Router()

router.get("/get", getQNA)

router.get("/get/:id", getOneQNA)

router.post("/create", createQNA)

router.put("/update/:id", updateQNA)

router.delete("/delete/:id", deleteQNA)


export {router as qnaRouter }
