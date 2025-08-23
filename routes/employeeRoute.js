import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";
import { addEmployee, disableEmployee, getEmployee, getOneEmployee, updateEmployee } from "../controller/employeeController.js";
import { addSalary, mySalaryHistory, salaryHistory } from "../controller/salaryController.js";
import { applyingLeave, approveLeaves, checkLeave, checkLeaves, dashboardOverview } from "../controller/leaveController.js";

const router = Router()


router.post("/add", isAuthenticated, isAuthorized("admin"), addEmployee)

router.get("/get", isAuthenticated, isAuthorized("admin"), getEmployee)

router.get("/getone/:id", isAuthenticated,  isAuthorized("admin"), getOneEmployee)

router.patch("/update/:id", isAuthenticated, isAuthorized("admin"), updateEmployee)

router.patch("/disable/:id", isAuthenticated, isAuthorized("admin"), disableEmployee)

router.post("/addSalary", isAuthenticated, isAuthorized("admin"), addSalary)

router.get("/getSalary/:id", isAuthenticated, isAuthorized("admin"), salaryHistory)

router.get("/getSalary", isAuthenticated, isAuthorized("employee"), mySalaryHistory)

router.post("/leave", isAuthenticated, isAuthorized("employee", "admin"), applyingLeave)

router.get("/checkleave", isAuthenticated, isAuthorized("employee", "admin"), checkLeave)

router.get("/checkleaves", isAuthenticated, isAuthorized("admin"), checkLeaves)

router.patch("/approveleaves", isAuthenticated, isAuthorized("admin"), approveLeaves)

router.get("/dashboard/overview", isAuthenticated, isAuthorized("admin"), dashboardOverview)















export {router as employeeRouter}

 