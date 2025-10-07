const Category = require("../Models/Category");

// get all categories
const getCategories = async (req, res) => {
  try {
    // Get page number from query params, default = 1
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Fetch paginated categories
    const categories = await Category.find()
      .skip(skip)
      .limit(limit);

    // Get total count for frontend reference
    const totalCategories = await Category.countDocuments();

    res.status(200).json({
      success: true,
      data: categories,
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
      totalCategories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getCategories };
