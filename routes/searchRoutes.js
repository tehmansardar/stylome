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
 * @route   GET api/search/saerchbyname
 * @desc    Get salon name via search
 * @access  Public
 * @params	null
 * @body	salon
 */
router.get('/salonfullinfo/:salonId', searchCtrl.salonFullInfo);

module.exports = router;
