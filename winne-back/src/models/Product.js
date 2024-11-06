const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  name: String,
  hexCode: String,
  image: String,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [String],
  colors: [ColorSchema],
  tags: [String],
  slug: { type: String, unique: true },
  bestSeller: { type: Boolean, default: false },
  stock: { type: Number, required: true },
  remainingStock: { type: Number, required: true },
  images: [String],
});

module.exports = mongoose.model("Product", ProductSchema);
