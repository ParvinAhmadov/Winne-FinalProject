const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  getProfile,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authenticate, getProfile);
router.put("/update-profile", authenticate, updateProfile);

module.exports = router;
