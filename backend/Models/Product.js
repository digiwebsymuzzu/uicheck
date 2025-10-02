const mongoose = require("mongoose");

const attributeValueSchema = new mongoose.Schema({
  value: { type: String, required: true },
  sku: { type: String },
  regularPriceInr: { type: Number },
  salePriceInr: { type: Number },
  regularPriceUsd: { type: Number },
  salePriceUsd: { type: Number },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    default: "In Stock",
  },
  image: { type: String }, // path to uploaded image
});

const productAttributeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Size, Color
  values: [attributeValueSchema],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
  tags: [{ type: String }], // storing tag names
  attributes: [productAttributeSchema],
  images: [{ type: String }], // main product & gallery images
  regularPriceInr: { type: Number },
  salePriceInr: { type: Number },
  regularPriceUsd: { type: Number },
  salePriceUsd: { type: Number },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    default: "In Stock",
  },
  weight: { type: Number },
  dimensions: { type: Object }, // { length, width, height }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ✅ Export as ES module
module.exports = mongoose.model("Product", productSchema);
