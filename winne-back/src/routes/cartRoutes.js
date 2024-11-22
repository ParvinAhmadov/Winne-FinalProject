const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", authenticate, cartController.getCart);
router.post("/add", authenticate, cartController.addToCart);
router.put("/update/:productId", authenticate, cartController.updateCartItem); 
router.delete("/remove/:itemId", authenticate, cartController.removeCartItem);
router.delete("/clear", authenticate, cartController.clearCart);
router.get("/:userId", authenticate, cartController.getCart);
module.exports = router;
