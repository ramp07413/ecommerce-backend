import { Router  } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { addMoney, applyWalletMoney, getBalance, unapplyWalletMoney} from "../controller/transtionController.js";

const router = Router()

router.get("/checkBalance",isAuthenticated, getBalance)
// router.get("/allTransaction", allTransactions)
// router.get("/history", myhistory)
router.post("/addMoney",isAuthenticated, addMoney)
router.get("/applyWallet",isAuthenticated, applyWalletMoney)
router.get("/unapplyWallet",isAuthenticated, unapplyWalletMoney)


export {router as transactionRouter}