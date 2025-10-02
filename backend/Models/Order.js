const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      businessName: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postCode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      notes: { type: String },
    },
    cartItems: [
      {
        // _id: false,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
        returnStatus: { type: String, default: "None" }, // ✅ add this
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
