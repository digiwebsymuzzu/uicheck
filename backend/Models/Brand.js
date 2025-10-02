const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    brand_img: { type: String }, // image filename or path
    status: { type: Number, default: 1 }, // 1 = active, 0 = inactive
    parentBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    }, // self reference
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

module.exports = mongoose.model("Brand", brandSchema);
