import { Router } from "express";
import { addProductToRack, addRackRoW, DeleteProductToRack, deleteRack, getProductToRack, getRack, updateProductToRack, updateRackRoW } from "../controller/rackController.js";

const router = Router()


//rack manage

router.get("/", getRack)
router.post("/", addRackRoW)
router.patch("/:id", updateRackRoW)
router.delete("/:id", deleteRack)


// rack product manage 

router.post("/addToRack", addProductToRack)
router.get("/getByRack/:id",getProductToRack)
router.patch("/updateToRack/:id", updateProductToRack)
router.delete("/deleteFromRack/:rackId/:warehouseProductId", DeleteProductToRack )

export {router as rackRouter}