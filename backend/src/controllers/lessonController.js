const { listLessons, getLessonById, createLesson, updateLesson, deleteLesson } = require('../services/lessonService');
const prisma = require('../database/prismaClient');

async function uploadLessonVideo(req, res, next) {
  try {
    const { titulo, descricao, moduleId, order, duration } = req.body;
    const video = await prisma.video.create({
      data: {
        titulo,
        descricao,
        duracao: Number(duration),
        url: req.file ? `/uploads/${req.file.filename}` : '',
        provider: 'LOCAL',
      },
    });
    const lesson = await createLesson({ titulo, descricao, moduleId, order: Number(order), duration: Number(duration), video: { connect: { id: video.id } } });
    return res.status(201).json(lesson);
  } catch (error) {
    return next(error);
  }
}

async function listLessonsController(req, res, next) {
  try {
    const lessons = await listLessons();
    return res.json(lessons);
  } catch (error) {
    return next(error);
  }
}

async function getLesson(req, res, next) {
  try {
    const lesson = await getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Aula não encontrada.' });
    return res.json(lesson);
  } catch (error) {
    return next(error);
  }
}

async function updateLessonController(req, res, next) {
  try {
    const lesson = await updateLesson(req.params.id, req.body);
    return res.json(lesson);
  } catch (error) {
    return next(error);
  }
}

async function deleteLessonController(req, res, next) {
  try {
    await deleteLesson(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { uploadLessonVideo, listLessons: listLessonsController, getLesson, updateLesson: updateLessonController, deleteLesson: deleteLessonController };