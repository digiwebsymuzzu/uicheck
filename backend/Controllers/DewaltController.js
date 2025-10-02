const Dewalt = require("../Models/Dewalt");

// Get all active videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Dewalt.find({ status: 1 }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching videos" });
  }
};
