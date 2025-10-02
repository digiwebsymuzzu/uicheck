const Wishlist = require("../Models/Wishlist");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    // console.log("req.body:", req.body);
    // console.log("req.user:", req.user);
    try {

        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        // Check if already in wishlist
        const exist = await Wishlist.findOne({ userId, productId });
        if (exist) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        }

        const wishlistItem = new Wishlist({ userId, productId });
        await wishlistItem.save();

        res.status(200).json({ success: true, wishlist: wishlistItem });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get all wishlist items for a user
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.find({ userId }).populate("productId");
        res.status(200).json({ success: true, wishlist });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params; // wishlist item ID
        await Wishlist.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Removed from wishlist" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
