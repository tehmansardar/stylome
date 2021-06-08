import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
	isEmpty,
	isEmail,
	isLength,
} from '../../components/utils/validation/Validation';

import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

import {
	CircularProgress,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Grid,
	Typography,
	Container,
	TextField,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialState = {
	fname: '',
	lname: '',
	email: '',
	password: '',
	err: '',
	success: '',
	loading: true,
};

const SignUp = () => {
	const classes = useStyles();

	const [state, setState] = useState(initialState);
	const { fname, lname, email, password, err, success, loading } = state;

	useEffect(() => {
		setTimeout(function () {
			setState({ ...state, loading: false });
		}, 300);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value, err: '', success: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isEmpty(fname))
			return setState({
				...state,
				err: 'Enter your first name',
				success: '',
			});
		if (isEmpty(lname))
			return setState({
				...state,
				err: 'Enter your last name',
				success: '',
			});
		if (!isEmail(email))
			return setState({
				...state,
				err: 'Invalid email',
				success: '',
			});
		if (isEmpty(password))
			return setState({
				...state,
				err: 'Enter your password',
				success: '',
			});
		if (isLength(password))
			return setState({
				...state,
				err: 'Password must be atleast 6 characters',
				success: '',
			});

		try {
			const res = await axios.post('/api/user/signup', {
				fname,
				lname,
				email,
				password,
			});
			setState({ ...state, err: '', success: res.data.msg });
		} catch (error) {
			if (error.response.data.msg) {
				setState({
					...state,
					err: error.response.data.msg,
					success: '',
				});
			}
			if (error.response.data.msg[0].msg) {
				setState({
					...state,
					err: error.response.data.msg[0].msg,
					success: '',
				});
			}
		}
	};

	console.log(fname, lname, email, password, err, success);

	return (
		<div>
			{loading ? (
				<div className='h-96 flex justify-center items-center'>
					<CircularProgress color='primary' />
				</div>
			) : (
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					{success && <Success show={true} msg={success} />}
					{err && <Errors show={true} msg={err} />}
					<div className={classes.paper}>
						<Typography component='h1' variant='h5'>
							Sign up
						</Typography>
						<form onSubmit={handleSubmit} className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete='fname'
										name='fname'
										variant='outlined'
										required
										fullWidth
										id='firstName'
										label='First Name'
										autoFocus
										value={fname}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='lastName'
										label='Last Name'
										name='lname'
										autoComplete='lname'
										value={lname}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										value={email}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='password'
										label='Password'
										type='password'
										id='password'
										autoComplete='current-password'
										value={password}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox value='allowExtraEmails' color='primary' />
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign Up
							</Button>
							<Grid container justify='flex-end'>
								<Grid item>
									<Link
										to='/signin'
										className='hover:underline'
										style={{ color: '#FFCD06' }}
									>
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			)}
		</div>
	);
};

export default SignUp;
