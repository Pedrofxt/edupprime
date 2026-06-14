const { explainConcept, generateExercise, correctAnswer, getHistory } = require('../services/aiService');

async function explainConceptController(req, res, next) {
  try {
    const result = await explainConcept(req.user.id, req.body.topic);
    return res.json({ response: result });
  } catch (error) {
    return next(error);
  }
}

async function generateExerciseController(req, res, next) {
  try {
    const result = await generateExercise(req.user.id, req.body.subject);
    return res.json({ response: result });
  } catch (error) {
    return next(error);
  }
}

async function correctAnswerController(req, res, next) {
  try {
    const result = await correctAnswer(req.user.id, req.body.submission);
    return res.json({ response: result });
  } catch (error) {
    return next(error);
  }
}

async function getHistoryController(req, res, next) {
  try {
    const history = await getHistory(req.user.id);
    return res.json(history);
  } catch (error) {
    return next(error);
  }
}

module.exports = { explainConcept: explainConceptController, generateExercise: generateExerciseController, correctAnswer: correctAnswerController, getHistory: getHistoryController };