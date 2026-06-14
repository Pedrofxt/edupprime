const { adminDashboard } = require('../services/dashboardService');

async function adminStatsController(req, res, next) {
  try {
    const stats = await adminDashboard();
    return res.json(stats);
  } catch (error) {
    return next(error);
  }
}

module.exports = { adminStats: adminStatsController };
