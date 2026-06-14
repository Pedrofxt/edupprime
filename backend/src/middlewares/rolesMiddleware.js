function permit(...allowedRoles) {
  return (req, res, next) => {
    const { tipo_usuario } = req.user;
    if (allowedRoles.includes(tipo_usuario)) {
      return next();
    }
    return res.status(403).json({ error: 'Acesso negado.' });
  };
}

module.exports = { permit };