const Blog = require("../Models/Blog");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ statusactiveinactive: 1 }).sort({
      blogdate: -1,
    });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};
