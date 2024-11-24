const express = require("express");
const {
  createMessage,
  getMessages,
  getUserMessages,
  replyToMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createMessage);
router.get("/", authenticate, isAdmin, getMessages);
router.patch("/:id/reply", authenticate, isAdmin, replyToMessage);
router.delete("/:id", authenticate, isAdmin, deleteMessage);
router.get("/user", authenticate, getUserMessages);

module.exports = router;
