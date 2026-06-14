const bcrypt = require('bcrypt');
const prisma = require('../database/prismaClient');

async function getProfile(userId) {
  return prisma.user.findUnique({ where: { id: userId } });
}

async function updateProfile(userId, data) {
  const update = {};
  if (data.nome) update.nome = data.nome;
  if (data.sobrenome) update.sobrenome = data.sobrenome;
  if (data.foto) update.foto = data.foto;
  if (data.telefone) update.telefone = data.telefone;
  if (data.cpf) update.cpf = data.cpf;
  return prisma.user.update({ where: { id: userId }, data: update });
}

async function verifyEmail(userId) {
  return prisma.user.update({ where: { id: userId }, data: { status: 'ATIVO' } });
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const valid = await bcrypt.compare(oldPassword, user.senha);
  if (!valid) throw new Error('Senha atual incorreta.');
  const hashed = await bcrypt.hash(newPassword, 10);
  return prisma.user.update({ where: { id: userId }, data: { senha: hashed } });
}

async function logout(userId) {
  await prisma.refreshToken.deleteMany({ where: { userId } });
  return true;
}

module.exports = { getProfile, updateProfile, verifyEmail, changePassword, logout };