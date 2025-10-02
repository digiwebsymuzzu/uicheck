const Cart = require("../Models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, qty, selectedAttributes } = req.body; // <-- array from frontend

    // Agar selectedAttributes array me kuch hai, use query me consider kardo
    let query = { userId, productId };

    if (selectedAttributes && selectedAttributes.length > 0) {
      // MongoDB me exact array match thoda tricky hai, so for simplicity, ignore duplicate check
      // Agar duplicate check chahiye, to custom logic add kar sakte ho
    }

    let cartItem = await Cart.findOne(query);

    if (cartItem) {
      cartItem.qty += qty;
      // Optional: merge selectedAttributes if needed
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId,
        productId,
        qty,
        selectedAttributes, // ✅ ab array save ho raha hai
      });
      await cartItem.save();
    }

    res.status(200).json({ success: true, cart: cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all items in user cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware
    const cart = await Cart.find({ userId }).populate("productId");
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update quantity
exports.updateCart = async (req, res) => {
  try {
    const { productId, qty, attribute } = req.body;
    const userId = req.user.id; // 👈 login userId

    const cartItem = await Cart.findOneAndUpdate(
      { userId, productId, "attribute.attributeId": attribute.attributeId },
      { $set: { qty } },
      { new: true }
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.json({ success: true, cart: cartItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete item
exports.deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
