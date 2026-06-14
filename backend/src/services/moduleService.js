const prisma = require('../database/prismaClient');

async function createModule(data) {
  return prisma.module.create({ data });
}

async function listModules() {
  return prisma.module.findMany({ include: { lessons: true } });
}

async function getModuleById(id) {
  return prisma.module.findUnique({ where: { id }, include: { lessons: true } });
}

async function updateModule(id, data) {
  return prisma.module.update({ where: { id }, data });
}

async function deleteModule(id) {
  return prisma.module.delete({ where: { id } });
}

module.exports = { createModule, listModules, getModuleById, updateModule, deleteModule };