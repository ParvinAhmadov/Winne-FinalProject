const Product = require("../models/Product");
const upload = require("../middleware/upload");

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = [
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, price, sizes, colors, tags, slug, stock } = req.body;
      let images = req.files.map((file) => `/uploads/${file.filename}`);

      if (images.length < 2) {
        images.push("/uploads/placeholder-image.jpg");
      }

      let uniqueSlug = slug ? generateSlug(slug) : generateSlug(name);
      let slugExists = await Product.findOne({ slug: uniqueSlug });

      while (slugExists) {
        uniqueSlug = `${uniqueSlug}-${Math.floor(Math.random() * 1000)}`;
        slugExists = await Product.findOne({ slug: uniqueSlug });
      }

      const product = new Product({
        name,
        price,
        sizes: sizes ? JSON.parse(sizes) : [],
        colors: colors ? JSON.parse(colors) : [],
        tags: tags ? JSON.parse(tags) : [],
        slug: uniqueSlug,
        stock,
        remainingStock: stock,
        images,
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.updateProduct = [
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, sizes, colors, tags, slug, stock } = req.body;
      const images = req.files.map((file) => `/uploads/${file.filename}`);

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (slug && slug !== product.slug) {
        const slugExists = await Product.findOne({ slug });
        if (slugExists) {
          return res.status(400).json({
            message: "Slug is already in use. Please use a different one.",
          });
        }
        product.slug = slug;
      }

      if (name) product.name = name;
      if (price) product.price = parseFloat(price);
      if (sizes) product.sizes = sizes.split(",");
      if (colors) product.colors = JSON.parse(colors || "[]");
      if (tags) product.tags = tags.split(",");
      if (stock) {
        product.stock = parseInt(stock, 10);
        product.remainingStock = parseInt(stock, 10);
      }

      if (images.length > 0) {
        product.images = images;
      }

      const updatedProduct = await product.save();
      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.deleteProduct = async (req, res) => {
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

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.remainingStock < parsedQuantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    product.remainingStock -= parsedQuantity;
    await product.save();

    res.json({ message: "Stock updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.increaseStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.remainingStock += parseInt(quantity, 10);
    await product.save();

    res.json({ message: "Stock increased successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};