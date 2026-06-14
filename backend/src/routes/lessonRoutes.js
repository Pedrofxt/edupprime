const express = require('express');
const { uploadLessonVideo, listLessons, getLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'backend/src/uploads' });
const router = express.Router();

router.get('/', listLessons);
router.get('/:id', getLesson);
router.post('/', authMiddleware, permit('PROFESSOR', 'ADMIN'), upload.single('video'), uploadLessonVideo);
router.put('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), updateLesson);
router.delete('/:id', authMiddleware, permit('PROFESSOR', 'ADMIN'), deleteLesson);

module.exports = router;