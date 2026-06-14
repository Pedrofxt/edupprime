const { listCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollCourse } = require('../services/courseService');

async function listCoursesController(req, res, next) {
  try {
    const courses = await listCourses();
    return res.json(courses);
  } catch (error) {
    return next(error);
  }
}

async function getCourse(req, res, next) {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Curso não encontrado.' });
    return res.json(course);
  } catch (error) {
    return next(error);
  }
}

async function createCourseController(req, res, next) {
  try {
    const course = await createCourse(req.body, req.user.id);
    return res.status(201).json(course);
  } catch (error) {
    return next(error);
  }
}

async function updateCourseController(req, res, next) {
  try {
    const course = await updateCourse(req.params.id, req.body);
    return res.json(course);
  } catch (error) {
    return next(error);
  }
}

async function deleteCourseController(req, res, next) {
  try {
    await deleteCourse(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function enrollCourseController(req, res, next) {
  try {
    const enrollment = await enrollCourse(req.user.id, req.params.id);
    return res.status(201).json(enrollment);
  } catch (error) {
    return next(error);
  }
}

module.exports = { listCourses: listCoursesController, getCourse, createCourse: createCourseController, updateCourse: updateCourseController, deleteCourse: deleteCourseController, enrollCourse: enrollCourseController };