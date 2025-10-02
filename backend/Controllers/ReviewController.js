const Review = require("../Models/Review");

exports.addReview = async (req, res) => {
  try {
    const userId = req.user._id; // 🟢 middleware se aa raha hoga
    const { productId, rating, reviewTitle, reviewText } = req.body;

    if (!productId || !reviewTitle || !reviewText) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newReview = new Review({
      userId,
      productId,
      rating,
      reviewTitle,
      reviewText,
    });

    await newReview.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // Users ka data populate mat karo
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching reviews" });
  }
};
