const express = require("express");
const { isAdmin, authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticate, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;