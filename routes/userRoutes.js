const router = require('express').Router();

const {
	registerRules,
	validateRegister,
} = require('../middlwares/validateRegister');

const { signinRules, validateSignin } = require('../middlwares/validateSignin');

const userCtrl = require('../controllers/userCtrl');

/**
 * @route   POST api/users/register
 * @desc    Register new user
 * @access  Public
 * @params	null
 * @body	fname,lname,email,password
 */
router.post('/register', registerRules(), validateRegister, userCtrl.register);

/**
 * @route   POST api/users/activate
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
 * @route   POST api/users/refresh_token
 * @desc    Signin user step 2, Generaete access_token obj
 * @access  Public
 * @params	Get refreshtoken from cookies
 * @body	null
 */
router.post('/refresh_token', userCtrl.getAccessToken);

module.exports = router;
