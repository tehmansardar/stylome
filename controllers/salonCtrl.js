const Salon = require('../models/salonModel');
const User = require('../models/userModel');
const Service = require('../models/servicesModel');
const Staff = require('../models/staffModel');

const salonCtrl = {
	getAllSalons: async (req, res) => {
		try {
			const salons = await Salon.find().populate('staff').populate('services');
			res.json(salons);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	salonByUser: async (req, res) => {
		try {
			const salon = await Salon.findById(req.salon.id)
				.populate('staff')
				.populate('services');
			return res.status(200).json(salon);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	openSalon: async (req, res) => {
		const { name, gender } = req.body;
		try {
			const user = await Salon.findOne({ user: req.user.id });
			if (user) return res.status(400).json({ msg: 'User already have salon' });

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
	basicSalon: async (req, res) => {
		const { name, gender, timing, showcase, location, phone, description } =
			req.body;
		try {
			const updateSalon = {};
			if (name) updateSalon.name = name;
			if (gender) updateSalon.gender = gender;
			if (timing) updateSalon.timing = timing;
			if (showcase) updateSalon.showcase = showcase;
			if (location) updateSalon.location = location;
			if (phone) updateSalon.phone = phone;
			if (description) updateSalon.description = description;

			await Salon.findOneAndUpdate({ _id: req.salon.id }, updateSalon);

			return res.status(200).json({ msg: 'Added successfully' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	addService: async (req, res) => {
		try {
			const { service, customServices } = req.body;

			const newService = new Service({
				salon: req.salon.id,
				service,
				customServices,
			});

			await newService.save();

			//Get a salon
			const salon = await Salon.findById(req.salon.id);
			salon.services.push(newService._id);
			await salon.save();

			return res.status(200).json({ msg: 'New service has been added' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	newStaff: async (req, res) => {
		try {
			const { name, services } = req.body;

			// Time Slots

			function parseTime(s) {
				var c = s.split(':');
				return parseInt(c[0]) * 60 + parseInt(c[1]);
			}

			function convertHours(mins) {
				var hour = Math.floor(mins / 60);
				var mins = mins % 60;
				var converted = pad(hour, 2) + ':' + pad(mins, 2);
				return converted;
			}

			function pad(str, max) {
				str = str.toString();
				return str.length < max ? pad('0' + str, max) : str;
			}

			function calculate_time_slot(start_time, end_time, interval = '30') {
				var i, formatted_time;
				var time_slots = new Array();
				for (var i = start_time; i <= end_time; i = i + interval) {
					formatted_time = convertHours(i);
					time_slots.push({
						slot: formatted_time,
						book: true,
					});
				}
				return time_slots;
			}

			var start_time = parseTime(req.salon.timing.opening),
				end_time = parseTime(req.salon.timing.closing),
				interval = 30;

			var slots = calculate_time_slot(start_time, end_time, interval);

			// End time slots

			const newStaff = new Staff({
				salon: req.salon.id,
				name,
				services,
				slots,
			});

			await newStaff.save();

			//Get a salon
			const salon = await Salon.findById(req.salon.id);
			salon.staff.push(newStaff._id);
			await salon.save();

			return res.status(200).json({ msg: 'New member has been added' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	getStaff: async (req, res) => {
		try {
			const staff = await Staff.find({ salon: req.salon.id }).populate(
				'services'
			);
			return res.status(200).json(staff);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
};
module.exports = salonCtrl;
