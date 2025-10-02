const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getMyOrdersuser,
  returnOrderItem,
} = require("../Controllers/OrderController");
const { authMiddleware } = require("../Middlewares/Auth");

// ✅ Place Order
router.post("/add", authMiddleware, createOrder);

// ✅ Get my orders
router.get("/", getMyOrders);

// ✅ Get orders of logged-in user
router.get("/my-orders", authMiddleware, getMyOrdersuser);

router.put("/orders/:orderId/return/:itemId", authMiddleware, returnOrderItem);
module.exports = router;
