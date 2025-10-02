const express = require("express");
const router = express.Router();
const { getAllVideos } = require("../Controllers/DewaltController");

// GET all active videos
router.get("/", getAllVideos);

module.exports = router;
