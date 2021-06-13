const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema(
	{
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'salons',
		},
		service: {
			type: String,
			default: null,
		},
		customServices: {
			primary: {
				name: {
					type: String,
					default: null,
				},
				slots: {
					type: String,
					default: null,
				},
				price: {
					type: String,
					default: null,
				},
				currency: {
					type: String,
					default: null,
				},
			},
			secondary: {
				name: {
					type: String,
					default: null,
				},
				slots: {
					type: String,
					default: null,
				},
				price: {
					type: String,
					default: null,
				},
				currency: {
					type: String,
					default: null,
				},
			},
			tertiary: {
				name: {
					type: String,
					default: null,
				},
				slots: {
					type: String,
					default: null,
				},
				price: {
					type: String,
					default: null,
				},
				currency: {
					type: String,
					default: null,
				},
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('services', servicesSchema);
