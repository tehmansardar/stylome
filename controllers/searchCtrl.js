const Salon = require('../models/salonModel');

const searchCtrl = {
	searchByName: async (req, res) => {
		try {
			const { salon } = req.body;
			const salons = await Salon.find({ name: new RegExp(salon, 'i') });
			res.json(salons);
		} catch (error) {
			return res.status(500).json({ msg: err.message });
		}
	},
	salonFullInfo: async (req, res) => {
		try {
			const salon = await Salon.findById(req.params.salonId)
				.populate('staff')
				.populate('services');
			return res.status(200).json(salon);
		} catch (error) {
			return res.status(500).json({ msg: err.message });
		}
	},
	saerchByType: async (req, res) => {
		try {
			const { type } = req.body;
			// const salons = await Salon.find({ name: new RegExp(salon, 'i') });
			// res.json(salons);
		} catch (error) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = searchCtrl;
