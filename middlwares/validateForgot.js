const { body, validationResult } = require('express-validator');

const forgotRules = () => {
	return [body('email', 'Please provide email').isEmail()];
};

const validateForgot = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ msg: errors.array() });
	}
	try {
		next();
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { forgotRules, validateForgot };
