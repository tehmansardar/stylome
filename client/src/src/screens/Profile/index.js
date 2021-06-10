import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	createMuiTheme,
	ThemeProvider,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { useSelector, useDispatch } from 'react-redux';

import { isLength } from '../../components/utils/validation/Validation';

import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatarWrapper: {
		height: theme.spacing(15),
		width: theme.spacing(15),
	},
	avatar: {
		// margin: theme.spacing(1),
		// backgroundColor: theme.palette.secondary.main,
		height: theme.spacing(15),
		width: theme.spacing(15),
		border: '5px solid #FFCD06',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialState = {
	fname: '',
	lname: '',
	password: '',
	err: '',
	success: '',
};

const Profile = () => {
	const classes = useStyles();

	const [loading, setLoading] = useState(true);
	const [avatar, setAvatar] = useState(false);

	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 700);
	}, []);

	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);
	const { user } = auth;

	const [state, setState] = useState(initialState);
	const { fname, lname, password, err, success } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value, err: '', success: '' });
	};

	const changeAvatar = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if (!file)
				return setState({
					...state,
					err: 'No file uploaded.',
					success: '',
				});

			if (file.size > 2 * 1024 * 1024)
				return setState({ ...state, err: 'Size too large.', success: '' });

			if (
				file.type !== 'image/jpeg' &&
				file.type !== 'image/jpg' &&
				file.type !== 'image/png'
			)
				return setState({
					...state,
					err: 'File format is incorrect.',
					success: '',
				});

			let formData = new FormData();
			formData.append('file', file);

			// setLoading(true);
			const res = await axios.post('/api/avatar/user_avatar', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					Authorization: token,
				},
			});

			// setLoading(false);
			setAvatar(res.data.url);
		} catch (err) {
			setState({ ...state, err: err.response.data.msg, success: '' });
		}
	};

	const updateUser = () => {
		try {
			axios.patch(
				'/api/user/update_user',
				{
					fname: fname ? fname : user.fname,
					lname: lname ? lname : user.lname,
					avatar: avatar ? avatar : user.avatar,
				},
				{
					headers: { Authorization: token },
				}
			);
			setState({ ...state, err: '', success: 'Profile has been updated' });
		} catch (error) {
			setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	const updatePassword = () => {
		if (isLength(password))
			return setState({
				...state,
				err: 'Password must be atleast 6 characters',
				success: '',
			});

		try {
			axios.post(
				'/api/user/reset',
				{ password },
				{
					headers: { Authorization: token },
				}
			);
			setState({ ...state, err: '', success: 'Profile has been updated' });
		} catch (error) {
			setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	const handleUpdate = () => {
		if (fname || lname || avatar) updateUser();
		if (password) updatePassword();
	};

	return (
		<div>
			{loading ? (
				<div className='h-96 flex justify-center items-center'>
					<CircularProgress color='primary' />
				</div>
			) : (
				<Container component='main' maxWidth='xs'>
					{success && <Success show={true} msg={success} />}
					{err && <Errors show={true} msg={err} />}
					<CssBaseline />
					<div className={classes.paper}>
						<div className={`${classes.avatarWrapper} avatarWrapper`}>
							<Avatar
								className={`${classes.avatar} avatar`}
								src={avatar ? avatar : user.avatar}
							/>
							<span>
								<label htmlFor='file'>
									<CameraAltIcon /> Chnage
								</label>
								<input
									type='file'
									name='file'
									id='file'
									onChange={changeAvatar}
									className='hidden'
								/>
							</span>
						</div>
						<Typography component='h1' variant='h5'>
							{user.fname} {user.lname}
						</Typography>
						<div className='mt-5'>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										name='fname'
										fullWidth
										id='firstName'
										label='First Name'
										autoFocus
										defaultValue={user.fname}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id='lastName'
										label='Last Name'
										name='lname'
										autoComplete='lname'
										defaultValue={user.lname}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										disabled
										defaultValue={user.email}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name='password'
										label='Change Password'
										type='password'
										id='password'
										autoComplete='current-password'
										defaultValue={password}
										onChange={handleChange}
									/>
								</Grid>
								<Button
									type='button'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
									onClick={handleUpdate}
								>
									Save Changes
								</Button>
							</Grid>
						</div>
					</div>
				</Container>
			)}
		</div>
	);
};

export default Profile;
