function checkPremium(req, res, next) {
  if (req.user.plano !== 'PREMIUM') {
    return res.status(402).json({ error: 'Conteúdo premium bloqueado. Faça upgrade para premium.' });
  }
  return next();
}

module.exports = { checkPremium };