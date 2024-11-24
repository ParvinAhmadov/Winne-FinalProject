const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/add", authenticate, wishlistController.addToWishlist);
router.delete(
  "/remove/:productId",
  authenticate,
  wishlistController.removeFromWishlist
);
router.get("/", authenticate, wishlistController.getWishlist);

module.exports = router;
