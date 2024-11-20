const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Product already in wishlist." });
    }

    const newWishlistItem = new Wishlist({ userId, productId });
    await newWishlistItem.save();

    res.status(201).json({ message: "Product added to wishlist." });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({
      userId: req.user.id,
      productId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.json({
      message: "Product removed from wishlist",
      deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove product from wishlist" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id }).populate(
      "productId"
    );

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};
