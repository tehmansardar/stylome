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
	signin: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ msg: 'Email does not exists' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: 'Passowrd is incorrect.' });

			const refreshToken = createRefreshToken({ id: user._id });

			res.cookie('refreshtoken', refreshToken, {
				httpOnly: true,
				path: '/api/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.json({ msg: 'Signin Successfully' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	getAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			if (!rf_token) return res.status(400).json({ msg: 'Please Signin' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(400).json({ msg: 'Please Signin' });

				const access_token = createAccessToken({ id: user.id });
				res.json({ access_token });
			});
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;

			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ msg: 'Email does not exists' });

			const access_token = createAccessToken({ id: user._id });
			const url = `${CLIENT_URL}/user/reset/${access_token}`;
			sendEmail(email, url, 'Reset Password');

			res.json({ msg: 'Check your email to reset password' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);
			console.log(passwordHash);

			await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ password: passwordHash }
			);

			return res.status(205).json({ msg: 'Password change successfully.' });
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},
	getUserInfo: async (req, res) => {
		try {
			const user = await User.findById(req.user.id).select('-password');
			res.json(user);
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
