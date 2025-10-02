const express = require("express");
const router = express.Router();
const { getAllBlogs } = require("../Controllers/BlogController");
const Blog = require("../Models/Blog");

router.get("/blogs", getAllBlogs);

// Get single blog by slug
router.get("/blog/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slugurl: req.params.slug,
      statusactiveinactive: 1,
    });
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
});

module.exports = router;
