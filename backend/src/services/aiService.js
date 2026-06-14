const OpenAI = require('openai');
const prisma = require('../database/prismaClient');
const { getConfig } = require('../config');

const client = new OpenAI({ apiKey: getConfig().openAiApiKey });

async function askTutor(userId, prompt) {
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });
  const answer = response.output[0].content[0].text || 'Sem resposta.';
  await prisma.messageAI.create({ data: { usuarioId: userId, pergunta: prompt, resposta: answer, tipo: 'TUTOR' } });
  return answer;
}

async function explainConcept(userId, topic) {
  const prompt = `Explique o conceito de ${topic} em linguagem clara para um aluno.`;
  return askTutor(userId, prompt);
}

async function generateExercise(userId, subject) {
  const prompt = `Crie um exercício prático sobre ${subject} com enunciado e resposta.`;
  return askTutor(userId, prompt);
}

async function correctAnswer(userId, submission) {
  const prompt = `Corrija a resposta a seguir e explique: ${submission}`;
  return askTutor(userId, prompt);
}

async function getHistory(userId) {
  return prisma.messageAI.findMany({ where: { usuarioId: userId }, orderBy: { createdAt: 'desc' } });
}

module.exports = { explainConcept, generateExercise, correctAnswer, getHistory };