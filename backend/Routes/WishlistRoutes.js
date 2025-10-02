const express = require("express");
const router = express.Router();
const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} = require("../Controllers/WishlistController");
const { authMiddleware } = require("../Middlewares/Auth");

// Add product to wishlist
router.post("/add", authMiddleware, addToWishlist);

// Get user's wishlist
router.get("/", authMiddleware, getWishlist);

// Remove item from wishlist
router.delete("/delete/:id", authMiddleware, removeFromWishlist);

module.exports = router;
