const { createQuiz, listQuizzes, getQuizById, submitQuiz, deleteQuiz } = require('../services/quizService');

async function createQuizController(req, res, next) {
  try {
    const quiz = await createQuiz({ ...req.body, courseId: req.body.courseId });
    return res.status(201).json(quiz);
  } catch (error) {
    return next(error);
  }
}

async function listQuizzesController(req, res, next) {
  try {
    const quizzes = await listQuizzes(req.user.id);
    return res.json(quizzes);
  } catch (error) {
    return next(error);
  }
}

async function getQuiz(req, res, next) {
  try {
    const quiz = await getQuizById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado.' });
    return res.json(quiz);
  } catch (error) {
    return next(error);
  }
}

async function submitQuizController(req, res, next) {
  try {
    const result = await submitQuiz(req.params.id, req.user.id, req.body.answers);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function deleteQuizController(req, res, next) {
  try {
    await deleteQuiz(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { createQuiz: createQuizController, listQuizzes: listQuizzesController, getQuiz, submitQuiz: submitQuizController, deleteQuiz: deleteQuizController };