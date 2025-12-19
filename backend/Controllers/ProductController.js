const Product = require("../Models/Product");
const Brand = require("../Models/Brand"); // required for populate("brands")
const Category = require("../Models/Category"); // required for populate("categories")

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const superParentName = req.params.superParentName?.toLowerCase();

    console.log("Requested Superparent:", superParentName);

    if (!superParentName) {
      return res
        .status(400)
        .json({ success: false, message: "Superparent name required" });
    }

    // Fetch all categories
    const matchedCategories = await Category.find({
      cat_superparent_name: new RegExp(`^${superParentName}$`, "i"),
    }).select("name");

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
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // .lean() ensures we get plain JS objects

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

    const totalProducts = await Product.countDocuments({
      "productCategories.name": { $in: categoryNames },
    });

    return res.json({
      success: true,
      products: filteredProducts,
      total: totalProducts,
      page,
      pages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error in getProductsBySuperparent:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name, page = 1, limit = 20 } = req.query;

    if (!name || name.length < 3) {
      return res.json({ success: true, products: [], total: 0, pages: 0 });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 🔑 detect source
    const isShopSearch = req.query.page || req.query.limit;

    // -------------------------------
    // 1️⃣ HEADER AUTOCOMPLETE MODE
    // -------------------------------
    if (!isShopSearch) {
      const products = await Product.aggregate([
        {
          $search: {
            index: "productSearch",
            autocomplete: {
              query: name,
              path: "productName",
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $limit: 10 },
        {
          $project: {
            productName: 1,
            productSlug: 1,
            productMainImage: 1,
            productSalePriceInr: 1,
          },
        },
      ]);

      return res.json({ success: true, products });
    }

    // -------------------------------
    // 2️⃣ SHOP SEARCH MODE (PAGINATED)
    // -------------------------------
    const searchPipeline = [
      {
        $search: {
          index: "productSearch",
          autocomplete: {
            query: name,
            path: "productName",
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      { $skip: skip },
      { $limit: limitNum },
      {
        $project: {
          productName: 1,
          productSlug: 1,
          productMainImage: 1,
          productSalePriceInr: 1,
          productRegularPriceInr: 1,
          productCategories: 1,
        },
      },
    ];

    const countPipeline = [
      {
        $search: {
          index: "productSearch",
          autocomplete: {
            query: name,
            path: "productName",
          },
        },
      },
      { $count: "total" },
    ];

    const [products, countResult] = await Promise.all([
      Product.aggregate(searchPipeline),
      Product.aggregate(countPipeline),
    ]);

    const total = countResult[0]?.total || 0;

    res.json({
      success: true,
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Filter
const getFilteredProducts = async (req, res) => {
  try {
    const { category, attribute, values, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    console.log("Incoming query params:", req.query);

    // ---------- CATEGORY FILTER ----------
    if (category) {
      const categoryNames = category
        .split(",")
        .map((c) => c.trim())
        .map((c) => c.toLowerCase()); // normalize case

      console.log("Filtering by categories:", categoryNames);

      query["productCategories.name"] = {
        $in: categoryNames.map((c) => c.toUpperCase()), // adjust case to match DB if needed
      };
    }
    // ---------- ATTRIBUTE FILTER ----------
    else if (attribute && values) {
      const valuesArray = values.split(",").map((v) => v.trim());
      console.log(
        "Filtering by attribute:",
        attribute,
        "with values:",
        valuesArray
      );

      query["productAttributes"] = {
        $elemMatch: {
          attributeName: attribute,
          "attributeValues.attributeValue": { $in: valuesArray },
        },
      };
    }

    console.log("MongoDB query object:", JSON.stringify(query, null, 2));

    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Product.countDocuments(query);

    console.log("Products fetched:", products.length);

    res.json({
      success: true,
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsBySuperparent,
  searchProducts,
  getFilteredProducts,
};
