const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogtitle: { type: String, trim: true },
    slugurl: { type: String, trim: true },
    blogtags: { type: String, trim: true },
    blogcategory: { type: String },
    blogImage: { type: String }, // URL or path
    authorname: { type: String, trim: true },
    blogdate: { type: Date, default: Date.now },
    blogparagraph: { type: String },
    statusactiveinactive: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
