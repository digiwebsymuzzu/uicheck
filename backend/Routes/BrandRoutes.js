const express = require("express");
const { getBrands } = require("../Controllers/BrandController");

const router = express.Router();

// ✅ GET all brands
router.get("/", getBrands);

module.exports = router;
