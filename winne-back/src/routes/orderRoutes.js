const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); 

router.post('/create', authenticate, orderController.createOrder); 
router.get('/', authenticate, orderController.getUserOrders); 
router.put("/:orderId/status", authenticate, isAdmin, orderController.updateOrderStatus); 

module.exports = router;
