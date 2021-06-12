const router = require('express').Router();

// Auth
const auth = require('../middlwares/auth');
const salonAuth = require('../middlwares/salonAuth');

const salonCtrl = require('../controllers/salonCtrl');

/**
 * @route   GET /api/salon/salons
 * @desc    Get the data of all salons.
 * @access  Public
 * @params	null
 * @body	null
 */
router.get('/salons', salonCtrl.getAllSalons);

/**
 * @route   POST /api/salon/opensalon
 * @desc    User All users except password, get data from req.user with generate from auth middleware.
 * @access  Private
 * @params	Authorization
 * @body	name, gender: ["male", "female", "other"]
 */
router.post('/opensalon', auth, salonCtrl.openSalon);
/**
 * @route   PATCH /api/salon/basicsalonInfo
 * @desc    User All users except password, get data from req.user with generate from auth middleware.
 * @access  Private
 * @params	Authorization
 * @body	req.salon.id,name, gender: ["male", "female", "other"], timing:{ {opening:""}, {closing:""} }, showcase:[], location:{{address},{postalCode}, {city}, {province}, {country}}, phone:"", description:""
 */
router.patch('/basicsalonInfo', auth, salonAuth, salonCtrl.basicSalon);

module.exports = router;
