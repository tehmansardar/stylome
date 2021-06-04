const { body, validationResult } = require('express-validator');

const resetRules = () => {
	return [
		body('password', 'Password must greater than 6 characters').isLength({
			min: 6,
		}),
	];
};

const validateReset = async (req, res, next) => {
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

module.exports = { resetRules, validateReset };
