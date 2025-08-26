import { Router } from "express";
import { createReward, deleteReward, editReward, getRewardList, randomreward } from "../controller/rewardController.js";

const router = Router()

router.get("/", (req, res, next)=>{
    res.send("working !")
})
router.get("/random", randomreward)
router.get("/rewardlist", getRewardList )
router.post("/create", createReward )
router.patch("/edit/:id", editReward )
router.delete("/delete/:id", deleteReward )

export {router as rewardRouter}