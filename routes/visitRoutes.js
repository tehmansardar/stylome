const router = require('express').Router();

const visitCtrl = require('../controllers/visitCtrl');

// Auth
const auth = require('../middlwares/auth');

/**
 * @route   POST api/visit/registerVisit
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization
 * @body    salon,service,customService,staff,slots:[{slot,book,_id}], price, status
 */
router.post('/registerVisit', auth, visitCtrl.registerVisit);

module.exports = router;
