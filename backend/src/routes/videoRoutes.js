const express = require('express');
const multer = require('multer');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/rolesMiddleware');
const { createVideo, listVideos } = require('../controllers/videoController');

const upload = multer({ dest: 'src/uploads' });
const router = express.Router();

router.get('/', listVideos);
router.post('/', authMiddleware, permit('PROFESSOR', 'ADMIN'), upload.single('video'), createVideo);

module.exports = router;
