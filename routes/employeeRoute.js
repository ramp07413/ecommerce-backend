import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";
import { addEmployee, disableEmployee, getEmployee, getOneEmployee, updateEmployee } from "../controller/employeeController.js";
import { addSalary, mySalaryHistory, salaryHistory } from "../controller/salaryController.js";
import { applyingLeave, approveLeaves, checkLeave, checkLeaves } from "../controller/leaveController.js";

const router = Router()


router.post("/add", isAuthenticated, isAuthorized("admin"), addEmployee)

router.get("/get", isAuthenticated, isAuthorized("admin"), getEmployee)

router.get("/getone/:id", isAuthenticated,  isAuthorized("admin"), getOneEmployee )

router.put("/update/:id", isAuthenticated, isAuthorized("admin"), updateEmployee)

router.patch("/disable/:id", isAuthenticated, isAuthorized("admin"), disableEmployee)

router.post("/addSalary", isAuthenticated, isAuthorized("admin"), addSalary)

router.get("/getSalary/:id", isAuthenticated, isAuthorized("admin"), salaryHistory)

router.get("/getSalary", isAuthenticated, isAuthorized("employee"), mySalaryHistory)

router.post("/leave", isAuthenticated, isAuthorized("employee"), applyingLeave)

router.get("/checkleave", isAuthenticated, isAuthorized("employee"), checkLeave)

router.get("/checkleaves", isAuthenticated, isAuthorized("admin"), checkLeaves)

router.patch("/approveleaves", isAuthenticated, isAuthorized("admin"), approveLeaves)















export {router as employeeRouter}