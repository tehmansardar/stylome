const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
	{
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'salons',
		},
		name: {
			type: String,
			default: null,
		},
		services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'services' }],
		slots: [
			{
				slot: {
					type: String,
					default: null,
				},
				book: {
					type: Boolean,
					default: true,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('staff', staffSchema);
