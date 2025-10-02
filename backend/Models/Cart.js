const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    selectedAttributes: [
      {
        attributeId: { type: mongoose.Schema.Types.ObjectId },
        attributeName: { type: String },
        attributeValue: { type: String },
        attributeSalePriceInr: { type: Number },
        attributeRegularPriceInr: { type: Number },
        attributeSalePriceUsd: { type: Number },
        attributeRegularPriceUsd: { type: Number },
      },
    ],
    qty: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
