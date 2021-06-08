import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import {
	isEmpty,
	isEmail,
	isLength,
	isMatch,
} from '../../components/utils/validation/Validation';
import { dispatchSignin } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';

import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

import {
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
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialState = {
	email: '',
	password: '',
	err: '',
	success: '',
	loading: true,
};

const SignIn = () => {
	const classes = useStyles();

	const [state, setState] = useState(initialState);
	const { email, password, err, success, loading } = state;

	useEffect(() => {
		setTimeout(function () {
			setState({ ...state, loading: false });
		}, 300);
	}, []);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setState({ ...state, [name]: value, err: '', success: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isEmpty(email))
			return setState({
				...state,
				err: 'Enter your email',
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
			const res = await axios.post('/api/user/signin', { email, password });
			setState({ ...state, err: '', success: res.data.msg });
			localStorage.setItem('firstLogin', true);

			dispatch(dispatchSignin());
			history.push('/');
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
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form
							onSubmit={handleSubmit}
							className={classes.form}
							noValidate
							autoComplete='off'
						>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								value={email}
								onChange={handleChange}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								value={password}
								onChange={handleChange}
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link
										to='/forgot-password'
										className='hover:underline'
										style={{ color: '#FFCD06' }}
									>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link
										to='/signup'
										variant='body2'
										className='hover:underline'
										style={{ color: '#FFCD06' }}
									>
										Don't have an account? Sign Up
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

export default SignIn;
