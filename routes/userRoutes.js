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

// Auth Amdin
const authAdmin = require('../middlwares/authAdmin');

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

/**
 * @route   GET api/user/all_users
 * @desc    User All users except password, get data from req.user with generate from auth middleware.
 * @access  Private
 * @params	Authorization
 * @body	null
 */
router.get('/all_users', auth, authAdmin, userCtrl.getAllUserInfo);

/**
 * @route   GET api/user/signout
 * @desc    Remove token from cookie
 * @access  Public
 * @params	null
 * @body	null
 */
router.get('/signout', userCtrl.signOut);

/**
 * @route   PATCH api/user/update_user
 * @desc    Update First name, Last name, Avatar
 * @access  Private
 * @params	Authorization token
 * @body	null
 */
router.patch('/update_user', auth, userCtrl.updateUser);

module.exports = router;
