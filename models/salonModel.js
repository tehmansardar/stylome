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
		gender: [
			{
				type: String,
				required: true,
				default: null,
			},
		],
		showcase: {
			type: String,
			default: '',
		},
		location: {
			address: {
				type: String,
				default: null,
			},
			city: {
				type: String,
				default: null,
			},
			postalCode: {
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
		// located: {
		// 	lat: {
		// 		type: String,
		// 		default: null,
		// 	},
		// 	long: {
		// 		type: String,
		// 		default: null,
		// 	},
		// },
		description: {
			type: String,
			default: 'Nothing in description',
		},
		phone: {
			type: String,
			default: null,
		},
		//openingDays: [],
		timing: {
			opening: {
				type: String,
				default: null,
			},
			closing: {
				type: String,
				default: null,
			},
		},
		services: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'services',
			},
		],
		staff: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'staff',
			},
		],
		allow: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Salon', salonSchema);
