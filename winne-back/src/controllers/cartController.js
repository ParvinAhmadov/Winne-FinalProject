const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    const populatedItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price || 0, 
      quantity: item.quantity,
      image: item.productId.image || (item.productId.images ? item.productId.images[0] : null),
    }));


    res.json({ items: populatedItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

   
    let actualProductId = productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const product = await Product.findOne({ slug: productId });
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      actualProductId = product._id; 
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === actualProductId.toString()
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: actualProductId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    
    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    
    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { productId: itemId } } },
      { new: true } 
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  
exports.clearCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      cart.items = []; 
      await cart.save();
  
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
