const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Checkout Error:", error.message);
    res.status(500).json({ message: "Server error during checkout." });
  }
});

module.exports = router;
