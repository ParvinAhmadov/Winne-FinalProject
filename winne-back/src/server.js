const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const checkoutRoutes = require("./routes/checkout");
const orderRoutes = require("./routes/orders");
const messageRoutes = require('./routes/messageRoutes');

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", 'PATCH'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/messages', messageRoutes);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
