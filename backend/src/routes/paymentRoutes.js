const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createPayment, createSubscription, webhook, listPayments } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', authMiddleware, createPayment);
router.post('/subscription', authMiddleware, createSubscription);
router.post('/webhook', webhook);
router.get('/', authMiddleware, listPayments);

module.exports = router;