const { MercadoPagoConfig, Payment, PreApproval } = require('mercadopago');
const prisma = require('../database/prismaClient');
const { getConfig } = require('../config');

const mercadoPagoConfig = new MercadoPagoConfig({
  accessToken: getConfig().mercadoPagoAccessToken,
});
const paymentClient = new Payment(mercadoPagoConfig);
const subscriptionClient = new PreApproval(mercadoPagoConfig);

async function createPayment(data, userId) {
  const paymentData = {
    transaction_amount: Number(data.valor),
    description: data.descricao || 'EduPrime subscription',
    payment_method_id: data.metodo,
    payer: {
      email: data.email,
      first_name: data.nome,
      last_name: data.sobrenome,
    },
  };

  const result = await paymentClient.create({ body: paymentData });
  const status = result.status === 'approved' ? 'APROVADO' : 'PENDENTE';
  const payment = await prisma.payment.create({
    data: {
      usuarioId: userId,
      valor: Number(data.valor),
      status,
      metodo: data.metodo,
      mercadoPagoId: String(result.id),
    },
  });

  if (status === 'APROVADO') {
    await prisma.user.update({ where: { id: userId }, data: { plano: 'PREMIUM' } });
  }

  return { payment, preference: result };
}

async function createSubscription(data, userId) {
  const subscriptionData = {
    plan_id: data.planId,
    payer_email: data.email,
  };

  const result = await subscriptionClient.create({ body: subscriptionData });
  const payment = await prisma.payment.create({
    data: {
      usuarioId: userId,
      valor: Number(data.valor),
      status: 'PENDENTE',
      metodo: 'CARTAO',
      subscriptionId: String(result.id),
    },
  });

  return { payment, subscription: result };
}

async function handleWebhook(body) {
  if (!body || !body.type) {
    throw new Error('Webhook inválido.');
  }
  const { type, data } = body;
  if (type === 'payment') {
    const paymentId = data.id;
    const payment = await prisma.payment.findFirst({ where: { mercadoPagoId: String(paymentId) } });
    if (!payment) return null;
    const status = data.status === 'approved' ? 'APROVADO' : data.status === 'rejected' ? 'RECUSADO' : 'PENDENTE';
    await prisma.payment.update({ where: { id: payment.id }, data: { status } });
    if (status === 'APROVADO') {
      await prisma.user.update({ where: { id: payment.usuarioId }, data: { plano: 'PREMIUM' } });
    }
    return payment;
  }
  return null;
}

async function listUserPayments(userId) {
  return prisma.payment.findMany({ where: { usuarioId: userId }, orderBy: { dataPagamento: 'desc' } });
}

module.exports = { createPayment, createSubscription, handleWebhook, listUserPayments };