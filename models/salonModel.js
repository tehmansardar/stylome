const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			default: null,
		},
		gender: {
			type: String,
			required: true,
			default: null,
		},
		showcase: [],
		location: {
			address: {
				type: String,
				default: null,
			},
			city: {
				type: String,
				default: null,
			},
			province: {
				type: String,
				default: null,
			},
			country: {
				type: String,
				default: null,
			},
		},
		located: {
			lat: {
				type: String,
				default: null,
			},
			long: {
				type: String,
				default: null,
			},
		},
		description: {
			type: String,
			default: 'Nothing in description',
		},
		phone: {
			type: String,
			default: null,
		},
		openingDays: [],
		timing: {
			open: {
				type: String,
				default: null,
			},
			close: {
				type: String,
				default: null,
			},
		},
		staff: [],
		allow: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Salon', salonSchema);
