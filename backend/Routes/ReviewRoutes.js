const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewsByProduct,
} = require("../Controllers/ReviewController");
const { authMiddleware } = require("../Middlewares/Auth");

// Add new review
router.post("/add", authMiddleware, addReview);

// Get reviews by product ID
router.get("/product/:productId", getReviewsByProduct);

module.exports = router;
