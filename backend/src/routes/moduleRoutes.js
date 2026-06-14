const express = require('express');
const { createModule, listModules, getModule, updateModule, deleteModule } = require('../controllers/moduleController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');

const router = express.Router();

router.get('/', listModules);
router.get('/:id', getModule);
router.post('/', authMiddleware, permit('PROFESSOR', 'ADMIN'), createModule);
router.put('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), updateModule);
router.delete('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), deleteModule);

module.exports = router;