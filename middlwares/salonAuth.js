const Salon = require('../models/salonModel');

const salonAuth = async (req, res, next) => {
	try {
		const salon = await Salon.findOne({ user: req.user.id });
		if (!salon)
			return res.status(400).json({ msg: 'Invalid salon credentials' });

		req.salon = salon;
		next();
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
module.exports = salonAuth;
