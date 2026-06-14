const prisma = require('../database/prismaClient');

async function createQuiz(data) {
  return prisma.quiz.create({ data, include: { questions: true } });
}

async function listQuizzes(userId) {
  return prisma.quiz.findMany({ where: { course: { enrollments: { some: { userId } } } }, include: { questions: true } });
}

async function getQuizById(id) {
  return prisma.quiz.findUnique({ where: { id }, include: { questions: true } });
}

async function submitQuiz(quizId, userId, answers) {
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
  if (!quiz) throw new Error('Quiz não encontrado.');
  let totalCorrect = 0;
  const results = [];
  for (const answer of answers) {
    const question = quiz.questions.find((q) => q.id === answer.questionId);
    const correto = question.resposta && question.resposta === answer.resposta;
    if (correto) totalCorrect += 1;
    const nota = correto ? question.ponto : 0;
    results.push({
      questionId: question.id,
      resposta: answer.resposta,
      correto,
      tempo: answer.tempo || 0,
      nota,
    });
  }
  const acertos = totalCorrect;
  const erros = quiz.questions.length - acertos;
  const notaFinal = (acertos / quiz.questions.length) * 10;
  await prisma.answer.createMany({ data: results.map((item) => ({
    userId,
    questionId: item.questionId,
    resposta: String(item.resposta),
    correto: item.correto,
    tempo: item.tempo,
    nota: item.nota,
  })) });
  return { acertos, erros, nota: notaFinal, total: quiz.questions.length };
}

async function deleteQuiz(id) {
  return prisma.quiz.delete({ where: { id } });
}

module.exports = { createQuiz, listQuizzes, getQuizById, submitQuiz, deleteQuiz };