// models/Attribute.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 1, // 1 = active, 0 = inactive
    },
  },
  { _id: true } // keep _id for each item
);

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    items: [itemSchema], // nested array of items
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attribute", attributeSchema);
