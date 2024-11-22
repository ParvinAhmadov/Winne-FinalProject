const express = require('express');
const router = express.Router();
const { createPaymentIntent, handleStripeWebhook } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
