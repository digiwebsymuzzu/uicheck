const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewsByProduct,
} = require("../Controllers/ReviewController");
const { authMiddleware } = require("../Middlewares/Auth");

// Add new review
router.post("/add", authMiddleware, addReview);
// GET => get all reviews for a product
router.get("/:productId", getReviewsByProduct);

module.exports = router;
