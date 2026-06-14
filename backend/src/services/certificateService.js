const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const prisma = require('../database/prismaClient');

async function generateCertificate(userId, courseId, nomeAluno, curso) {
  const codigoValidacao = uuidv4();
  const qrCodeUrl = await QRCode.toDataURL(`https://example.com/certificado/verificar/${codigoValidacao}`);
  return prisma.certificate.create({
    data: {
      usuarioId: userId,
      courseId,
      nomeAluno,
      curso,
      codigoValidacao,
      qrCodeUrl,
    },
  });
}

async function verifyCertificate(codigo) {
  return prisma.certificate.findUnique({ where: { codigoValidacao: codigo } });
}

module.exports = { generateCertificate, verifyCertificate };