const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { generateCertificate, verifyCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.post('/', authMiddleware, generateCertificate);
router.get('/verificar/:codigo', verifyCertificate);

module.exports = router;