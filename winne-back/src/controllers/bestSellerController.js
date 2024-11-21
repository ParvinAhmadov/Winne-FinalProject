const Product = require("../models/Product");
const upload = require("../middleware/upload");
const { generateSlug } = require("../utils/generateSlug");

exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ bestSeller: true });
    res.json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBestSeller = [
  upload.array("images", 5),
  async (req, res) => {
    try {
      console.log("Uploaded files:", req.files);
      console.log("Request body:", req.body);

      const { name, price, sizes, colors, tags, slug, stock } = req.body;

      if (!name || !price || !stock) {
        return res.status(400).json({
          message: "Name, price, and stock are required fields.",
        });
      }

      let images = [];
      if (req.files && req.files.length > 0) {
        images = req.files.map((file) => `/uploads/${file.filename}`);
      } else {
        images.push("/uploads/placeholder-image.jpg");
      }

      let uniqueSlug = slug ? generateSlug(slug) : generateSlug(name);
      let slugExists = await Product.findOne({ slug: uniqueSlug });
      if (slugExists) {
        uniqueSlug = `${uniqueSlug}-${Date.now()}`;
      }

      const product = new Product({
        name,
        price: parseFloat(price),
        sizes: sizes ? sizes.split(",") : [],
        colors: colors ? JSON.parse(colors) : [],
        tags: tags ? tags.split(",") : [],
        slug: uniqueSlug,
        images,
        stock: parseInt(stock, 10),
        remainingStock: parseInt(stock, 10),
        bestSeller: true,
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  },
];

exports.updateBestSeller = [
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, sizes, colors, tags, slug, stock } = req.body;

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!product.bestSeller) {
        return res
          .status(400)
          .json({ message: "Product is not marked as a best-seller" });
      }

      if (name) product.name = name;
      if (price) product.price = parseFloat(price);
      if (sizes) product.sizes = sizes.split(",");
      if (colors) product.colors = JSON.parse(colors || "[]");
      if (tags) product.tags = tags.split(",");
      if (slug) product.slug = slug;
      if (stock) {
        product.stock = parseInt(stock, 10);
        product.remainingStock = parseInt(stock, 10);
      }

      if (req.files && req.files.length > 0) {
        product.images = req.files.map((file) => `/uploads/${file.filename}`);
      }

      const updatedProduct = await product.save();
      res.json({
        message: "Best-seller product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.deleteBestSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
