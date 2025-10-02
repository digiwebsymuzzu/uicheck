const Brand = require("../Models/Brand");

// ✅ Fetch all brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching brands",
    });
  }
};
