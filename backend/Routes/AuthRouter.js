const {
  register,
  login,
  profile,
  updateProfile,
} = require("../Controllers/AuthController");
const { authMiddleware } = require("../Middlewares/Auth");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/register", registerValidation, register);
// Profile route (Protected)
router.get("/profile", authMiddleware, profile);
router.put("/updateprofile", authMiddleware, updateProfile);

module.exports = router;
