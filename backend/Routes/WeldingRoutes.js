const express = require("express");
const router = express.Router();
const { getAllVideos } = require("../Controllers/WeldingController");

// GET all active videos
router.get("/", getAllVideos);

module.exports = router;
