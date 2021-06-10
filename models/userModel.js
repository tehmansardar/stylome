const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: [true, 'Enter your first name'],
			trim: true,
		},
		lname: {
			type: String,
			required: [true, 'Enter your last name'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Enter your email'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Enter password'],
		},
		role: {
			type: Number,
			default: 0, //0=user 1=salon 2=admin
		},
		avatar: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
