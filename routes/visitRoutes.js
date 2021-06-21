const router = require('express').Router();

const visitCtrl = require('../controllers/visitCtrl');

// Auth
const auth = require('../middlwares/auth');

/**
 * @route   POST api/visit/staffforvisit
 * @desc    Find staff memebers who can provide specfice service
 * @access  Private
 * @params	Authorization
 * @body    service
 */
router.post('/staffforvisit', auth, visitCtrl.staffForVisit);

/**
 * @route   POST api/visit/registerVisit
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization
 * @body    salon,service,customService,staff,slots:[{slot,book,_id}], price, status
 */
router.post('/registerVisit', auth, visitCtrl.registerVisit);

module.exports = router;
