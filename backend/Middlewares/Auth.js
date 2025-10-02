const jwt = require("jsonwebtoken");
const CustomerModel = require("../Models/Customer");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["autherization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "unauthorized,JWT token is required" });
  }
  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.customer = decode;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "unauthorized,JWT token is wrong or expired" });
  }
};
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use decoded._id (not decoded.id)
    req.user = await CustomerModel.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = { ensureAuthenticated, authMiddleware };
