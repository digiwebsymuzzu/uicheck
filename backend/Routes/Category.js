// routes/category.js
const router = require("express").Router();
const { getCategories } = require("../Controllers/CategoryController");

router.get("/", getCategories);

module.exports = router;
