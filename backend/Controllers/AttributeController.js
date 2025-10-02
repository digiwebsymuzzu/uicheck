const AttributeModel = require("../Models/Attribute");
const getAttributes = async (req, res) => {
  try {
    const attributes = await AttributeModel.find({
      name: { $in: ["Color", "Size", "Shoe Size Required"] },
    }); // only active ones
    res.status(200).json({
      success: true,
      data: attributes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching attributes",
      error: err.message,
    });
  }
};

module.exports = { getAttributes };
