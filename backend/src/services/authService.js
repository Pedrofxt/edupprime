const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const prisma = require('../database/prismaClient');
const { getConfig } = require('../config');
const { sendEmail } = require('./emailService');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

function generateToken(user) {
  return jwt.sign({ userId: user.id }, getConfig().jwtSecret, { expiresIn: getConfig().jwtExpiresIn });
}

function generateRefreshToken(user) {
  const token = jwt.sign({ userId: user.id }, getConfig().jwtRefreshSecret, { expiresIn: getConfig().refreshTokenExpiresIn });
  return token;
}

async function registerUser(data) {
  const hashed = await hashPassword(data.senha);
  const user = await prisma.user.create({
    data: {
      nome: data.nome,
      sobrenome: data.sobrenome,
      email: data.email.toLowerCase(),
      senha: hashed,
      foto: data.foto,
      telefone: data.telefone,
      cpf: data.cpf,
      tipo_usuario: data.tipo_usuario || 'ALUNO',
      status: 'PENDENTE',
    },
  });
  const verificationCode = uuidv4();
  await prisma.notification.create({
    data: {
      usuarioId: user.id,
      titulo: 'Verifique seu email',
      corpo: `Seu código de verificação: ${verificationCode}`,
      tipo: 'EMAIL',
    },
  });
  await sendEmail(user.email, 'Bem-vindo ao EduPrime', `Olá ${user.nome}, bem-vindo. Use o código ${verificationCode} para verificar seu email.`);
  return user;
}

async function loginUser(email, senha) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) throw new Error('Usuário ou senha inválidos');
  const valid = await comparePassword(senha, user.senha);
  if (!valid) throw new Error('Usuário ou senha inválidos');
  await prisma.user.update({ where: { id: user.id }, data: { ultimo_login: new Date() } });
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
  return { token, refreshToken, user };
}

async function refreshToken(token) {
  const decoded = jwt.verify(token, getConfig().jwtRefreshSecret);
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.expiresAt < new Date()) throw new Error('Refresh token inválido.');
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user) throw new Error('Usuário não encontrado.');
  const newToken = generateToken(user);
  return { token: newToken, user };
}

async function forgotPassword(email) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) throw new Error('Email não cadastrado.');
  const code = uuidv4();
  await prisma.notification.create({
    data: { usuarioId: user.id, titulo: 'Recuperação de senha', corpo: `Use o código ${code} para recuperar sua senha.`, tipo: 'EMAIL' },
  });
  await sendEmail(user.email, 'Recuperação de senha EduPrime', `Seu código de recuperação é ${code}`);
  return { code };
}

async function resetPassword(email, code, newPassword) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) throw new Error('Email não cadastrado.');
  const hashed = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { senha: hashed, status: 'ATIVO' } });
  return true;
}

module.exports = { registerUser, loginUser, refreshToken, forgotPassword, resetPassword, comparePassword, hashPassword };