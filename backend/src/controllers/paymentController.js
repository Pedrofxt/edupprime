const { createPayment, createSubscription, handleWebhook, listUserPayments } = require('../services/paymentService');

async function createPaymentController(req, res, next) {
  try {
    const result = await createPayment(req.body, req.user.id);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function createSubscriptionController(req, res, next) {
  try {
    const result = await createSubscription(req.body, req.user.id);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function webhookController(req, res, next) {
  try {
    await handleWebhook(req.body);
    return res.status(200).json({ message: 'Webhook recebido.' });
  } catch (error) {
    return next(error);
  }
}

async function listPaymentsController(req, res, next) {
  try {
    const payments = await listUserPayments(req.user.id);
    return res.json(payments);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createPayment: createPaymentController, createSubscription: createSubscriptionController, webhook: webhookController, listPayments: listPaymentsController };