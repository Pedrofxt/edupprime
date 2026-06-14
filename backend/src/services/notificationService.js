const prisma = require('../database/prismaClient');
const { sendEmail } = require('./emailService');

async function listNotifications(userId) {
  return prisma.notification.findMany({ where: { usuarioId: userId }, orderBy: { createdAt: 'desc' } });
}

async function createNotification({ usuarioId, titulo, corpo, tipo = 'INTERNA', sendEmailFlag = false }) {
  const notification = await prisma.notification.create({ data: { usuarioId, titulo, corpo, tipo } });
  if (sendEmailFlag) {
    const user = await prisma.user.findUnique({ where: { id: usuarioId } });
    if (user) await sendEmail(user.email, titulo, corpo);
  }
  return notification;
}

module.exports = { listNotifications, createNotification };
