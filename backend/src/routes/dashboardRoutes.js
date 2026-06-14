const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');
const { studentDashboard, teacherDashboard, adminDashboard } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/student', authMiddleware, permit('ALUNO'), studentDashboard);
router.get('/teacher', authMiddleware, permit('PROFESSOR'), teacherDashboard);
router.get('/admin', authMiddleware, permit('ADMIN'), adminDashboard);

module.exports = router;