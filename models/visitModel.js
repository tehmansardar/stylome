const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
	{
		users: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
		salons: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Salon',
		},
		services: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'services',
		},
		customService: {
			type: String,
			default: null,
		},
		staff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'staff',
		},
		slots: [
			{
				_id: {
					type: String,
					default: null,
				},
				slot: {
					type: String,
					default: null,
				},
				book: {
					type: Boolean,
					default: false,
				},
			},
		],
		price: {
			type: String,
			default: null,
		},
		status: {
			type: Number,
			default: 0, // 0 =incoming 1 = acitve 2=complete
		},
		rating: {
			stars: {
				type: Number,
				default: 0,
			},
			review: {
				type: String,
				default: '',
			},
		},
		date: {
			type: Date,
			default: '',
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('visits', visitSchema);
