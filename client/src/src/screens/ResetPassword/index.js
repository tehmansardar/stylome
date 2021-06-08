import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import {
	createMuiTheme,
	Button,
	CssBaseline,
	TextField,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core';

import {
	isEmpty,
	isLength,
	isMatch,
} from '../../components/utils/validation/Validation';
import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

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
	password: '',
	cf_password: '',
	err: '',
	success: '',
};

const ResetPassword = () => {
	const classes = useStyles();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 300);
	}, []);

	const [state, setState] = useState(initialState);
	const { password, cf_password, err, success } = state;
	const { token } = useParams();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value, err: '', success: '' });
	};

	const handleResetPass = async (e) => {
		e.preventDefault();
		if (isLength(password))
			return setState({
				...state,
				err: 'Password must be atleast 6 characters',
				success: '',
			});

		if (!isMatch(password, cf_password))
			return setState({ ...state, err: 'Password did not match', success: '' });

		try {
			const res = await axios.post(
				'/api/user/reset',
				{ password },
				{
					headers: { Authorization: token },
				}
			);
			return setState({
				...state,
				password: '',
				cf_password: '',
				err: '',
				success: res.data.msg,
			});
		} catch (error) {
			err.response.data.msg &&
				setState({ ...state, err: err.response.data.msg, success: '' });
		}
	};

	console.log(success);

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
							Reset Password
						</Typography>
						<form
							onSubmit={handleResetPass}
							className={classes.form}
							noValidate
						>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='New Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={password}
								onChange={handleChange}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='cf_password'
								label='Confirm Password'
								type='password'
								id='cf_password'
								autoComplete='current-password'
								value={cf_password}
								onChange={handleChange}
							/>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Reset Password
							</Button>
						</form>
					</div>
				</Container>
			)}
		</div>
	);
};

export default ResetPassword;
