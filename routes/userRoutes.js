const router = require('express').Router();

// Validations
const {
	registerRules,
	validateRegister,
} = require('../middlwares/validateRegister');

const { signinRules, validateSignin } = require('../middlwares/validateSignin');

const { forgotRules, validateForgot } = require('../middlwares/validateForgot');

const { resetRules, validateReset } = require('../middlwares/validateReset');

// Auth
const auth = require('../middlwares/auth');

const userCtrl = require('../controllers/userCtrl');

/**
 * @route   POST api/user/register
 * @desc    Register new user
 * @access  Public
 * @params	null
 * @body	fname,lname,email,password
 */
router.post('/register', registerRules(), validateRegister, userCtrl.register);

/**
 * @route   POST api/user/activate
 * @desc    Create User Via generated token
 * @access  Public
 * @params	null
 * @body	activation_token
 */
router.post('/activate', userCtrl.activateEmail);

/**
 * @route   POST api/users/signin
 * @desc    Signin user step 1
 * @access  Public
 * @params	null
 * @body	email,password
 */
router.post('/signin', signinRules(), validateSignin, userCtrl.signin);

/**
 * @route   POST api/user/refresh_token
 * @desc    Signin user step 2, Generaete access_token obj
 * @access  Private
 * @params	Get refreshtoken from cookies
 * @body	null
 */
router.post('/refresh_token', userCtrl.getAccessToken);

/**
 * @route   POST api/user/forgot
 * @desc    Forgot Password, Send email
 * @access  Public
 * @params	null
 * @body	email
 */
router.post('/forgot', forgotRules(), validateForgot, userCtrl.forgotPassword);

/**
 * @route   POST api/user/reset
 * @desc    Reset Password
 * @access  Private
 * @params	Authorization
 * @body	password
 */
router.post(
	'/reset',
	auth,
	resetRules(),
	validateReset,
	userCtrl.resetPassword
);

/**
 * @route   GET api/user/user_info
 * @desc    User Infromation except password
 * @access  Private
 * @params	Authorization
 * @body	null
 */
router.get('/user_info', auth, userCtrl.getUserInfo);

module.exports = router;
