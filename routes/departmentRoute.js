import { Router } from "express";
import { addDepartment, deleteDepartment, getDepartment, updateDepartment } from "../controller/departmentController.js";

const router = Router()



router.get("/", getDepartment)
router.post("/add", addDepartment)
router.patch("/update/:id", updateDepartment)
router.delete("/delete/:id", deleteDepartment)

export {router as departmentRouter}