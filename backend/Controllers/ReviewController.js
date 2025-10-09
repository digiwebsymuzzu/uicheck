const Review = require("../Models/Review");
const Customer = require("../Models/Customer"); // 🟢 Import customers model

exports.addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, rating, reviewTitle, reviewText } = req.body;

    console.log("🟢 [addReview] Request received:");
    console.log({ userId, productId, rating, reviewTitle, reviewText });

    if (!productId || !reviewTitle || !reviewText) {
      console.log("❌ Missing required fields");
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
    console.log("✅ Review saved successfully:", newReview._id);

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    console.error("💥 [addReview] Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Get reviews by product ID
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("🟢 [getReviewsByProduct] Incoming request:", req.params);

    if (!productId) {
      console.log("❌ No productId provided in params");
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    console.log(`🔍 Fetching reviews for productId: ${productId}`);
    const reviews = await Review.find({ productId }).lean();
    console.log(`📦 Reviews found: ${reviews.length}`);

    const populatedReviews = await Promise.all(
      reviews.map(async (review, index) => {
        console.log(`➡️ Populating user for review #${index + 1}`);
        const user = await Customer.findById(review.userId).select("firstName");
        return {
          ...review,
          user: user ? { userId: user._id, firstName: user.firstName } : null,
        };
      })
    );

    console.log("✅ All reviews populated successfully");
    res.status(200).json({
      success: true,
      reviews: populatedReviews,
    });
  } catch (err) {
    console.error("💥 [getReviewsByProduct] Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
