const { createModule, listModules, getModuleById, updateModule, deleteModule } = require('../services/moduleService');

async function createModuleController(req, res, next) {
  try {
    const module = await createModule(req.body);
    return res.status(201).json(module);
  } catch (error) {
    return next(error);
  }
}

async function listModulesController(req, res, next) {
  try {
    const modules = await listModules();
    return res.json(modules);
  } catch (error) {
    return next(error);
  }
}

async function getModule(req, res, next) {
  try {
    const module = await getModuleById(req.params.id);
    if (!module) return res.status(404).json({ error: 'Módulo não encontrado.' });
    return res.json(module);
  } catch (error) {
    return next(error);
  }
}

async function updateModuleController(req, res, next) {
  try {
    const module = await updateModule(req.params.id, req.body);
    return res.json(module);
  } catch (error) {
    return next(error);
  }
}

async function deleteModuleController(req, res, next) {
  try {
    await deleteModule(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { createModule: createModuleController, listModules: listModulesController, getModule, updateModule: updateModuleController, deleteModule: deleteModuleController };