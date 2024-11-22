const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;

    // Toplam tutarı hesaplama
    const totalAmount = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Payment Intent oluşturma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Cent olarak
      currency: 'usd',
      metadata: {
        userId: req.user.id,
        items: JSON.stringify(items),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent creation failed:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Ödeme tamamlandı, siparişi güncelle
    const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
    if (order) {
      order.status = 'Paid';
      await order.save();
    }
  }

  res.status(200).send('Webhook received');
};
