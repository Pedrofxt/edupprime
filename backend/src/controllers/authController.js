const { registerUser, loginUser, refreshToken, forgotPassword, resetPassword } = require('../services/authService');

async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({ user, message: 'Cadastro realizado. Verifique seu email.' });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginUser(req.body.email, req.body.senha);
    return res.json(result);
  } catch (error) {
    return next({ status: 401, message: error.message });
  }
}

async function refresh(req, res, next) {
  try {
    const result = await refreshToken(req.body.refreshToken);
    return res.json(result);
  } catch (error) {
    return next({ status: 401, message: error.message });
  }
}

async function forgot(req, res, next) {
  try {
    await forgotPassword(req.body.email);
    return res.json({ message: 'Email de recuperação enviado.' });
  } catch (error) {
    return next(error);
  }
}

async function reset(req, res, next) {
  try {
    await resetPassword(req.body.email, req.body.code, req.body.senha);
    return res.json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, refresh, forgot, reset };