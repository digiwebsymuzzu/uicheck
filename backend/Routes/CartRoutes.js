const express = require("express");
const router = require("express").Router();
const {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
} = require("../Controllers/cartController");
const { authMiddleware } = require("../Middlewares/Auth");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart); // no userId in URL
// Update qty
router.post("/update", authMiddleware, updateCart);
router.delete("/delete/:cartId", authMiddleware, deleteCartItem);

module.exports = router;
