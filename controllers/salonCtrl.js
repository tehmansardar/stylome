const Salon = require('../models/salonModel');
const User = require('../models/userModel');

const salonCtrl = {
	getAllSalons: async (req, res) => {
		try {
			const salons = await Salon.find();
			res.json(salons);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	openSalon: async (req, res) => {
		const { name, gender, location } = req.body;
		try {
			const user = await Salon.findOne({ user: req.user.id });
			if (user) return res.send('User Already have salon');

			const newSalon = new Salon({
				user: req.user.id,
				name,
				gender,
			});
			await newSalon.save();
			await User.findOneAndUpdate({ _id: req.user.id }, { role: 1 });

			res.status(200).json({ msg: 'Congratualtions for opening salon' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
};
module.exports = salonCtrl;
