import { Router  } from "express";
import { addProductToWarehouse, addToWarehouseCart, clearWarehouseCart, createrazorpayOrder, createWarehouse, createWarehouseOrder, deleteProductToWarehouse, editWarehouse, getAllWarehouse, getOneWarehouse, getProductOfWarehouse, getToWarehouseCart, getWarehouseOrder, removeFromWarehouseCart, updateProductToWarehouse, updateToWarehouseCart, updateWarehouseOrder, verifyPaymentOfWarehouse } from "../controller/warehouseController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";


const router  = Router()


// createWarehouse

router.post("/create", createWarehouse)
router.get("/getAll", getAllWarehouse)
router.get("/get/:No", getOneWarehouse)
router.patch("/edit/:No", editWarehouse)


router.get("/:warehouseNo/products", getProductOfWarehouse);
router.post("/:warehouseNo/products", addProductToWarehouse);
router.patch("/:warehouseNo/products/:productId", updateProductToWarehouse);
router.delete("/:warehouseNo/products/:productId", deleteProductToWarehouse);

// // Product Movement
// router.post("/:warehouseNo/products/:productId/move", productMoveToNewRac);

//warehouse  Cart
router.get("/cart/get", isAuthenticated, getToWarehouseCart);
router.post("/cart/add",isAuthenticated, addToWarehouseCart);
router.put("/cart/update",isAuthenticated, updateToWarehouseCart);
router.patch("/cart/remove",isAuthenticated, removeFromWarehouseCart);
router.delete("/cart/clear",isAuthenticated, clearWarehouseCart);

// // Orders
router.get("/orders/get",isAuthenticated, getWarehouseOrder)
router.post("/orders/create",isAuthenticated, createWarehouseOrder);
router.patch("/orders/update/:warehouseOrderId",isAuthenticated, updateWarehouseOrder);
router.post("/orders/razorpay", createrazorpayOrder);
router.post("/order/verifyPayment", verifyPaymentOfWarehouse)

// // Invoices
// router.get("/invoices/:invoiceId", getInvoice);
// router.post("/invoices", creatInvoice);

export { router as warehouseRouter };