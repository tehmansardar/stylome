const router = require('express').Router();

// Auth
const auth = require('../middlwares/auth');

const salonCtrl = require('../controllers/salonCtrl');

/**
 * @route   GET api/user/all_users
 * @desc    User All users except password, get data from req.user with generate from auth middleware.
 * @access  Private
 * @params	Authorization
 * @body	null
 */
router.get('/salons', salonCtrl.getAllSalons);

/**
 * @route   GET api/user/all_users
 * @desc    User All users except password, get data from req.user with generate from auth middleware.
 * @access  Private
 * @params	Authorization
 * @body	null
 */
router.post('/opensalon', auth, salonCtrl.openSalon);

module.exports = router;
