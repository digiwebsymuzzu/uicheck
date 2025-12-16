const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsBySuperparent,
  searchProducts,
  getFilteredProducts,
} = require("../Controllers/ProductController");
const Product = require("../Models/Product");

// In routes/ProductRoutes.js
router.get("/filter", getFilteredProducts);

// @route GET /api/products
router.get("/", getProducts);

// Explicit super parent category route — put BEFORE /:id
router.get("/superparent/:superParentName", getProductsBySuperparent);

// URL
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ productSlug: req.params.slug });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/products/search?name=iphone
router.get("/product/search", searchProducts);

// @route GET /api/products/:id
router.get("/:id", getProductById);

module.exports = router;
