const express = require("express");
const { getAttributes } = require("../Controllers/AttributeController");
const router = express.Router();

router.get("/attributes", getAttributes);

module.exports = router;
