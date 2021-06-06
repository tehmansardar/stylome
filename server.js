require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { file } = require('googleapis/build/src/apis/file');

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

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/avatar', require('./routes/userAvatarRoute'));

app.use('/', (req, res, next) => {
	res.json({ msg: 'Hello everyone' });
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
