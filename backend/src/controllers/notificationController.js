const { listNotifications, createNotification } = require('../services/notificationService');

async function listNotificationsController(req, res, next) {
  try {
    const items = await listNotifications(req.user.id);
    return res.json(items);
  } catch (error) {
    return next(error);
  }
}

async function createNotificationController(req, res, next) {
  try {
    const { titulo, corpo, sendEmail } = req.body;
    const notification = await createNotification({ usuarioId: req.user.id, titulo, corpo, sendEmailFlag: !!sendEmail });
    return res.status(201).json(notification);
  } catch (error) {
    return next(error);
  }
}

module.exports = { listNotifications: listNotificationsController, createNotification: createNotificationController };
