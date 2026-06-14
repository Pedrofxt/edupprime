const { getProfile, updateProfile, verifyEmail, changePassword, logout } = require('../services/userService');

async function getProfileController(req, res, next) {
  try {
    const profile = await getProfile(req.user.id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
}

async function updateProfileController(req, res, next) {
  try {
    const profile = await updateProfile(req.user.id, req.body);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
}

async function verifyEmailController(req, res, next) {
  try {
    await verifyEmail(req.user.id);
    return res.json({ message: 'Email verificado com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

async function changePasswordController(req, res, next) {
  try {
    await changePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
    return res.json({ message: 'Senha atualizada com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

async function logoutController(req, res, next) {
  try {
    await logout(req.user.id);
    return res.json({ message: 'Logout realizado com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getProfile: getProfileController, updateProfile: updateProfileController, verifyEmail: verifyEmailController, changePassword: changePasswordController, logout: logoutController };