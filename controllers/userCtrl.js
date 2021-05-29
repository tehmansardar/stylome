const User = require('../models/userModel');
const sendEmail = require('./sendMail');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { CLIENT_URL } = process.env;

const userCtrl = {
	register: async (req, res) => {
		try {
			const { fname, lname, email, password } = req.body;

			const user = await User.findOne({ email });

			if (user) return res.status(400).json({ msg: 'Email already exists' });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = {
				fname,
				lname,
				email,
				password: passwordHash,
			};

			const activation_token = createActivationToken(newUser);

			const url = `${CLIENT_URL}/user/activate/${activation_token}`;

			sendEmail(email, url, 'Verfiy your email address');

			return res.status(500).json({ msg: 'Verify your email address' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	activateEmail: async (req, res) => {
		try {
			const { activation_token } = req.body;

			const user = jwt.verify(
				activation_token,
				process.env.ACTIVATION_TOKEN_SECRET
			);

			const { fname, lname, email, password } = user;

			const check = await User.findOne({ email });

			if (check) return res.status(400).json({ msg: 'Email already exists' });

			const newUser = new User({ fname, lname, email, password });

			await newUser.save();

			res.status(201).json({ msg: 'Signup Successfully' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};

module.exports = userCtrl;
