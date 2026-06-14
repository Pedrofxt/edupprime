const prisma = require('../database/prismaClient');

async function listCourses() {
  return prisma.course.findMany({ include: { author: true, modules: true } });
}

async function getCourseById(id) {
  return prisma.course.findUnique({ where: { id }, include: { modules: true, ratings: true } });
}

async function createCourse(data, authorId) {
  return prisma.course.create({ data: { ...data, authorId } });
}

async function updateCourse(id, data) {
  return prisma.course.update({ where: { id }, data });
}

async function deleteCourse(id) {
  return prisma.course.delete({ where: { id } });
}

async function enrollCourse(userId, courseId) {
  return prisma.enrollment.create({ data: { userId, courseId } });
}

module.exports = { listCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollCourse };