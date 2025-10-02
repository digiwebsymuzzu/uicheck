const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsBySuperparent,
  searchProducts,
} = require("../Controllers/ProductController");

// @route GET /api/products
router.get("/", getProducts);

// Explicit super parent category route — put BEFORE /:id
router.get("/superparent/:superParentName", getProductsBySuperparent);

// @route GET /api/products/:id
router.get("/:id", getProductById);

// GET /api/products/search?name=iphone
router.get("/product/search", searchProducts);

module.exports = router;
