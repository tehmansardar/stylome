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
 * @route   GET /api/salon/salonbyuser
 * @desc    Get the data of salon by owner of salon.
 * @access  Private
 * @params	Authorization
 * @body	req.user, req.salon
 */
router.get('/salonbyuser', auth, salonAuth, salonCtrl.salonByUser);

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

/**
 * @route   POST /api/salon/addService
 * @desc    Add Service to salon
 * @access  Private
 * @params	Authorization
 * @body	req.salon.id, service, customServices:{ primary:{}, secondary:{}, tertiary:{}}
 */
router.post('/addService', auth, salonAuth, salonCtrl.addService);

/**
 * @route   POST /api/salon/newstaff
 * @desc    Add new staff to salon with specialization of services can provide more than one services but opening time and closing time is mendatory to register user
 * @access  Private
 * @params	Authorization
 * @body    req.salon.id name, services, timing will automatically fetched from salon timing and divided them into slots
 */
router.post('/newstaff', auth, salonAuth, salonCtrl.newStaff);

/**
 * @route   GET /api/salon/getStaff
 * @desc    Add new staff to salon with specialization of services can provide more than one services but opening time and closing time is mendatory to register user
 * @access  Private
 * @params	Authorization
 * @body    req.salon
 */
router.get('/getStaff', auth, salonAuth, salonCtrl.getStaff);

module.exports = router;
