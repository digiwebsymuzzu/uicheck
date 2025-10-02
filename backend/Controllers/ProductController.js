const Product = require("../Models/Product");
const Brand = require("../Models/Brand"); // required for populate("brands")
const Category = require("../Models/Category"); // required for populate("categories")

// @desc Get all products
// @route GET /api/products
// @access Public (you can change later if you want auth)
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("categories")
//       .populate("brands");

//     res.json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page, default 1
    const limit = parseInt(req.query.limit) || 20; // items per page
    const skip = (page - 1) * limit;

    // Same data with pagination
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("categories")
      .populate("brands");

    const total = await Product.countDocuments();

    res.json({
      success: true,
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories")
      .populate("brands");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProductsBySuperparent = async (req, res) => {
  try {
    const superParentName = req.params.superParentName?.toLowerCase();

    console.log("Requested Superparent:", superParentName);

    if (!superParentName) {
      return res
        .status(400)
        .json({ success: false, message: "Superparent name required" });
    }

    // Fetch all categories
    const allCategories = await Category.find();
    console.log("Total categories fetched:", allCategories.length);

    const matchedCategories = allCategories.filter(
      (cat) =>
        cat.cat_superparent_name &&
        cat.cat_superparent_name.toLowerCase() === superParentName
    );

    console.log(
      "Matched categories:",
      matchedCategories.map((c) => c.name)
    );
    console.log("Matched categories count:", matchedCategories.length);

    if (matchedCategories.length === 0) {
      return res.json({ success: true, products: [] });
    }

    const categoryNames = matchedCategories.map((c) => c.name);

    // Fetch products that have at least one category matching
    const products = await Product.find({
      "productCategories.name": { $in: categoryNames },
    }).lean(); // .lean() ensures we get plain JS objects

    console.log("Products fetched:", products.length);

    // Map products safely
    const filteredProducts = products.map((product) => {
      const categoriesArray = product.productCategories || [];
      const relevantCategories = categoriesArray.filter((cat) =>
        categoryNames.includes(cat.name)
      );

      return {
        _id: product._id,
        productName: product.productName || "",
        productSlug: product.productSlug || "",
        categories: relevantCategories.map((c) => ({ name: c.name })),
        productRegularPriceInr: product.productRegularPriceInr || 0,
        productSalePriceInr: product.productSalePriceInr || 0,
        productRegularPriceUsd: product.productRegularPriceUsd || 0,
        productSalePriceUsd: product.productSalePriceUsd || 0,
        productStock: product.productStock || 0,
        stockStatus: product.productStock === 1 ? "In Stock" : "Out of Stock",
        productShortDescription: product.productShortDescription || "",
        productLongDescription: product.productLongDescription || "",
        productMainImage: product.productMainImage || "",
        productImages: product.productImages || [],
        productWeight: product.productWeight || 0,
        productDimensions: product.productDimensions || {},
        productAttributes: product.productAttributes || [],
        productBrands: product.productBrands || [],
        productTags: product.productTags || [],
      };
    });

    console.log("Filtered products count:", filteredProducts.length);

    return res.json({ success: true, products: filteredProducts });
  } catch (error) {
    console.error("Error in getProductsBySuperparent:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Search term required" });
    }

    const products = await Product.find({
      productName: { $regex: name, $options: "i" }, // note: productName
    });

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsBySuperparent,
  searchProducts,
};
