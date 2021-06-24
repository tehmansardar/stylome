const Visit = require('../models/visitModel');
const Staff = require('../models/staffModel');

const visitCtrl = {
	staffForVisit: async (req, res) => {
		const { service } = req.body;
		try {
			const staff = await Staff.find({ services: service });
			return res.status(200).json(staff);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	registerVisit: async (req, res) => {
		try {
			const { salon, service, customService, staff, slots, price, status } =
				req.body;

			const newVisit = new Visit({
				users: req.user.id,
				salons: salon,
				services: service,
				customService,
				staff,
				slots,
				price,
				status,
				date: new Date(),
			});
			await Staff.findByIdAndUpdate(
				staff,
				{ $set: { 'slots.$[elem].book': false } },
				{ arrayFilters: [{ 'elem._id': { $in: slots.map((s) => s._id) } }] }
			);
			await newVisit.save();
			res.status(200).json({ msg: 'Schedule Successfully' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	salonVisit: async (req, res) => {
		try {
			const visits = await Visit.find({
				$and: [{ salons: req.salon.id }, { status: 0 }],
			})
				.populate('users')
				.populate('staff')
				.populate('services')
				.sort({ createdAt: -1 });
			res.json(visits);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	userVisits: async (req, res) => {
		try {
			const visits = await Visit.find({
				users: req.user.id,
			})
				.populate('salons')
				.populate('staff')
				.populate('services')
				.sort({ createdAt: -1 });
			res.json(visits);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	clearVisit: async (req, res) => {
		const { visitId, stars, review } = req.body;
		try {
			const visits = await Visit.findOneAndUpdate(
				{
					$and: [{ _id: visitId }, { users: req.user.id }, { status: 0 }],
				},
				{
					'rating.stars': stars,
					'rating.review': review,
					status: 1,
				}
			);
			res.json({ msg: 'Success' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	getRating: async (req, res) => {
		const { salonId } = req.body;
		try {
			const visits = await Visit.find({
				$and: [{ salons: salonId }, { status: 1 }],
			})
				.populate('users')
				.populate('staff')
				.populate('services')
				.sort({ createdAt: -1 });
			res.json(visits);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
};
module.exports = visitCtrl;
