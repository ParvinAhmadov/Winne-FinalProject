const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const totalAmount = cart.items.reduce((total, item) => {
      if (!item.productId) return total;
      return total + (item.productId.price || 0) * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId: req.user.id,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
      })),
      amount: totalAmount,
      status: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Order creation failed:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create order. Please try again." });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "items.productId"
    );
    res.json({ orders });
  } catch (error) {
    console.error("Failed to fetch user orders:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID." });
    }

    const validStatuses = ["Pending", "Completed", "Failed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Failed to update order status:", error);
    res.status(500).json({ message: "Failed to update order status." });
  }
};
