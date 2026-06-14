const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');
const { checkPremium } = require('../middlewares/premiumMiddleware');
const { createCourse, listCourses, getCourse, updateCourse, deleteCourse, enrollCourse } = require('../controllers/courseController');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', getCourse);
router.post('/', authMiddleware, permit('PROFESSOR', 'ADMIN'), createCourse);
router.put('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), updateCourse);
router.delete('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), deleteCourse);
router.post('/:id/enroll', authMiddleware, enrollCourse);
router.get('/:id/premium', authMiddleware, checkPremium, getCourse);

module.exports = router;