const router = require('express').Router();

const searchCtrl = require('../controllers/searchCtrl');

/**
 * @route   GET api/search/saerchbyname
 * @desc    Get salon name via search
 * @access  Public
 * @params	null
 * @body	salon
 */
router.post('/saerchbyname', searchCtrl.searchByName);

/**
 * @route   GET api/search/salonfullinfo/:salonId
 * @desc    Get the slaon info by id of salon
 * @access  Public
 * @params	null
 * @body    null
 */
router.get('/salonfullinfo/:salonId', searchCtrl.salonFullInfo);

/**
 * @route   GET api/search/search
 * @desc    Get salon array via type or location
 * @access  Public
 * @params	null
 * @body	type,location
 */
router.post('/search', searchCtrl.saerch);

module.exports = router;
