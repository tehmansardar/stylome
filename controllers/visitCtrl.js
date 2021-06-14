const Visit = require('../models/visitModel');
const Staff = require('../models/staffModel');

const visitCtrl = {
	registerVisit: async (req, res) => {
		try {
			const { salon, service, customService, staff, slots, price, status } =
				req.body;

			const newVisit = new Visit({
				visitor: req.user.id,
				salon,
				service,
				customService,
				staff,
				slots,
				price,
				status,
			});
			await Staff.findByIdAndUpdate(
				staff,
				{ $set: { 'slots.$[elem].book': false } },
				{ arrayFilters: [{ 'elem._id': { $in: slots.map((s) => s._id) } }] }
			);
			await newVisit.save();
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
};
module.exports = visitCtrl;
