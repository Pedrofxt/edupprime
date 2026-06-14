const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, forgot, reset } = require('../controllers/authController');
const { validate } = require('../middlewares/validationMiddleware');

const router = express.Router();

const registerValidators = [
	body('nome').isLength({ min: 2 }),
	body('sobrenome').optional().isLength({ min: 2 }),
	body('email').isEmail(),
	body('senha').isLength({ min: 6 }),
];

const loginValidators = [body('email').isEmail(), body('senha').isLength({ min: 6 })];

router.post('/register', registerValidators, validate, register);
router.post('/login', loginValidators, validate, login);
router.post('/refresh', refresh);
router.post('/forgot-password', [body('email').isEmail()], validate, forgot);
router.post('/reset-password', [body('email').isEmail(), body('senha').isLength({ min: 6 })], validate, reset);

module.exports = router;