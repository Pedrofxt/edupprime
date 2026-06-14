const { studentDashboard, teacherDashboard, adminDashboard } = require('../services/dashboardService');

async function studentDashboardController(req, res, next) {
  try {
    const data = await studentDashboard(req.user.id);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

async function teacherDashboardController(req, res, next) {
  try {
    const data = await teacherDashboard(req.user.id);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

async function adminDashboardController(req, res, next) {
  try {
    const data = await adminDashboard();
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

module.exports = { studentDashboard: studentDashboardController, teacherDashboard: teacherDashboardController, adminDashboard: adminDashboardController };