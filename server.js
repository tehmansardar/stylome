require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { file } = require('googleapis/build/src/apis/file');

// Models
const Staff = require('./models/staffModel');

// imports
const connectDB = require('./config/db.js');

// middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
	})
);
// DB config
connectDB();

// ........
const resetSlots = async () => {
	function parseHour(s) {
		let c = s.split(':');
		return parseInt(c[0]);
		// return parseInt(c[0]) * 60 + parseInt(c[1]);
	}
	function parseMin(s) {
		let c = s.split(':');
		return parseInt(c[1]);
		// return parseInt(c[0]) * 60 + parseInt(c[1]);
	}

	const d = new Date();
	const hh = d.getHours();

	const staffs = await Staff.find();
	staffs.forEach(async (staff) => {
		const staff_id = staff._id;
		const lastSlot = staff.slots[staff.slots.length - 1];
		dbHour = parseHour(lastSlot.slot);
		if (hh > dbHour) {
			await Staff.findOneAndUpdate(
				{ _id: staff_id },
				{ 'slots.$[].book': true }
			);
		}
	});
};

// app.use(resetSlots);
resetSlots();

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/avatar', require('./routes/userAvatarRoute'));
app.use('/api/salon', require('./routes/salonRoutes'));
app.use('/api/visit', require('./routes/visitRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

app.use('/', (req, res, next) => {
	res.json({ msg: 'Hello everyone' });
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
