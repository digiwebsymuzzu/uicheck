const Order = require("../Models/Order");

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const { cartItems, subtotal, tax, grandTotal, paymentMethod, user } =
      req.body;

    const formattedItems = cartItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      qty: item.qty,
      price: item.price,
      total: item.total,
    }));

    const order = new Order({
      userId: req.user._id, // ✅ login user ki id middleware se
      user, // billing/shipping details
      cartItems: formattedItems,
      subtotal,
      tax,
      grandTotal,
      paymentMethod,
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Order Create Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Orders of Logged-in User
const getMyOrdersuser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get My Orders Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// controllers/orderController.js
const returnOrderItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const item = order.cartItems.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    item.returnStatus = "Requested";
    await order.save();

    res.json({ success: true, message: "Return request submitted", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getMyOrdersuser, returnOrderItem };
