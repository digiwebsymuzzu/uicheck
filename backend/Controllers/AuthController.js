const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CustomerModel = require("../Models/Customer");
const register = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const customer = await CustomerModel.findOne({ email });
    if (customer) {
      return res.status(409).json({
        message: "User is already exist you can login",
        success: false,
      });
    }
    const customerModel = new CustomerModel({ firstName, email, password });
    customerModel.password = await bcrypt.hash(password, 10);
    await customerModel.save();
    res.status(201).json({ message: "Register Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await CustomerModel.findOne({ email });
    if (!customer) {
      return res.status(403).json({
        message: "User not found, please register first",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, customer.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: customer.email, _id: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      _id: customer._id, // 👈 ye add kar
      email: customer.email,
      firstName: customer.firstName,
    });
  } catch (err) {
    console.error(err); // log for debugging
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const profile = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/customerController.js
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, dob, phone } = req.body;

    // Build update object dynamically (only non-empty fields)
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined && lastName !== "")
      updateData.lastName = lastName;
    if (dob !== undefined && dob !== "") updateData.dob = dob;
    if (phone !== undefined && phone !== "") updateData.phone = phone;

    const updatedUser = await CustomerModel.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ success: true, message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { register, login, profile, updateProfile };
