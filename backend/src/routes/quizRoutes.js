const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');
const { createQuiz, listQuizzes, getQuiz, submitQuiz, deleteQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/', authMiddleware, listQuizzes);
router.get('/:id', authMiddleware, getQuiz);
router.post('/', authMiddleware, permit('PROFESSOR', 'ADMIN'), createQuiz);
router.post('/:id/submit', authMiddleware, submitQuiz);
router.delete('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), deleteQuiz);

module.exports = router;