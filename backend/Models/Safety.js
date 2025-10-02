const mongoose = require("mongoose");

const annularSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    youtubeurl: { type: String, trim: true },
    status: {
      type: Number,
      enum: [0, 1], // 0 = inactive, 1 = active
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Safetyyoutube", annularSchema);
