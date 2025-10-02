const express = require("express");
const router = express.Router();
const QuotationController = require("../Controllers/QuotationController");

// POST /api/quotation
router.post("/", QuotationController.createQuotation);

module.exports = router;
