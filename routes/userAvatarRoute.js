const router = require('express').Router();
const validateUserAvatar = require('../middlwares/validateUserAvatar');
const userAvatar = require('../controllers/userAvatarCtrl');
const auth = require('../middlwares/auth');

router.post('/user_avatar', validateUserAvatar, auth, userAvatar.uploadAvatar);

module.exports = router;
