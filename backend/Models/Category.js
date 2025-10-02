const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cat_id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, default: "" },
    cat_parent: { type: Number, default: 0 },
    cat_img: { type: String, default: null },
    cat_status: { type: Number, default: 1 },
    cat_superparent_name: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
