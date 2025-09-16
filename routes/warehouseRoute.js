import { Router  } from "express";
import { createWarehouse, editWarehouse, getAllWarehouse, getOneWarehouse } from "../controller/warehouseController.js";


const router  = Router()


// createWarehouse

router.post("/create", createWarehouse)
router.get("/getAll", getAllWarehouse)
router.get("/get/:No", getOneWarehouse)
router.patch("/edit/:No", editWarehouse)





// router.get("/:warehouseNo/products", getAllProuctOfWarehouse);
// router.get("/:warehouseNo/products/:productId", getOneSpecificProduct);
// router.post("/:warehouseNo/products", addProductToWarehouse);
// router.patch("/:warehouseNo/products/:productId", editProductToWarehouse);
// router.delete("/:warehouseNo/products/:productId", removeProductToWarehouse);

// // Product Movement
// router.post("/:warehouseNo/products/:productId/move", productMoveToNewRac);

// // Cart
// router.post("/cart/add", addTocart);
// router.post("/cart/remove", removeFromCart);
// router.delete("/cart/clear", clearCart);

// // Orders
// router.post("/orders", createOrder);
// router.patch("/orders/:orderId", updateOrder);
// router.post("/orders/razorpay", createOrderFromRazorpay);

// // Invoices
// router.get("/invoices/:invoiceId", getInvoice);
// router.post("/invoices", creatInvoice);

export { router as warehouseRouter };