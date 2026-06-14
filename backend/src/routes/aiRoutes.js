const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { explainConcept, generateExercise, correctAnswer, getHistory } = require('../controllers/aiController');

const router = express.Router();

router.post('/explain', authMiddleware, explainConcept);
router.post('/exercise', authMiddleware, generateExercise);
router.post('/correct', authMiddleware, correctAnswer);
router.get('/history', authMiddleware, getHistory);

module.exports = router;