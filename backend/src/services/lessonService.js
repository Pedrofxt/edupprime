const prisma = require('../database/prismaClient');

async function listLessons() {
  return prisma.lesson.findMany({ include: { video: true, quiz: true } });
}

async function getLessonById(id) {
  return prisma.lesson.findUnique({ where: { id }, include: { video: true, quiz: true } });
}

async function createLesson(data) {
  return prisma.lesson.create({ data });
}

async function updateLesson(id, data) {
  return prisma.lesson.update({ where: { id }, data });
}

async function deleteLesson(id) {
  return prisma.lesson.delete({ where: { id } });
}

module.exports = { listLessons, getLessonById, createLesson, updateLesson, deleteLesson };