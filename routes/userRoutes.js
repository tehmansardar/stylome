const router = require('express').Router();

const {
	userValidationRules,
	validateRegister,
} = require('../middlwares/validateRegister');
const userCtrl = require('../controllers/userCtrl');

/**
 * @route   POST api/users/register
 * @desc    Register new user
 * @access  Public
 * @params	null
 * @body	fname,lname,email,password
 */

router.post(
	'/register',
	userValidationRules(),
	validateRegister,
	userCtrl.register
);

/**
 * @route   POST api/users/activate
 * @desc    Create User Via generated token
 * @access  Public
 * @params	null
 * @body	activation_token
 */

router.post('/activate', userCtrl.activateEmail);

module.exports = router;
