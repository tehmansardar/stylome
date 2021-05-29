const { validationResult, body } = require('express-validator');

const userValidationRules = () => {
	return [
		body('fname', 'Please provide first name').not().isEmpty(),
		body('lname', 'Please provide last name').not().isEmpty(),
		body('email', 'Please provide email').isEmail(),
		body('password', 'Password must greater than 6 characters').isLength({
			min: 6,
		}),
	];
};

const validateRegister = async (req, res, next) => {
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

module.exports = { userValidationRules, validateRegister };
