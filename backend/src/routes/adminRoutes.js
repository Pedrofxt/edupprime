const express = require('express');
const { adminStats } = require('../controllers/adminController');
const { permit } = require('../middlewares/rolesMiddleware');

const router = express.Router();

router.get('/stats', permit('ADMIN'), adminStats);

module.exports = router;
