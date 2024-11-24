const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const orderController = require("../controllers/orderController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

router.post("/", authenticate, orderController.createOrder);

router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Siparişler alınamadı." });
  }
});

router.put("/:orderId", authenticate, async (req, res) => {
  const { status } = req.body;

  if (
    !["Pending", "Paid", "Shipped", "Delivered", "Cancelled"].includes(status)
  ) {
    return res.status(400).json({ message: "Geçersiz durum!" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "Geçersiz sipariş ID'si!" });
    }

    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Sipariş durumu güncellendi.", order });
  } catch (error) {
    console.error("Sipariş Durumu Güncelleme Hatası:", error.message);
    res.status(500).json({ message: "Sipariş durumu güncellenemedi." });
  }
});

router.get("/admin/all", authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders for admin:", error.message);
    res.status(500).json({ message: "Failed to fetch orders for admin." });
  }
});
router.put("/admin/:orderId", authenticate, isAdmin, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Completed", "Failed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully.", order });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ message: "Failed to update order status." });
  }
});
module.exports = router;
