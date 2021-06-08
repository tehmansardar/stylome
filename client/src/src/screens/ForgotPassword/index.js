import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	createMuiTheme,
	Button,
	CssBaseline,
	TextField,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { isEmpty, isEmail } from '../../components/utils/validation/Validation';
import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

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
	err: '',
	success: '',
};

const ForgotPassword = () => {
	const classes = useStyles();

	const [loading, setLoading] = useState(true);

	const [state, setState] = useState(initialState);
	const { email, err, success } = state;

	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 300);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value, err: '', success: '' });
	};

	const forgotPassword = async (e) => {
		e.preventDefault();

		if (!isEmail(email))
			return setState({ ...state, err: 'Invalid email', success: '' });

		try {
			const res = await axios.post('/api/user/forgot', { email });
			return setState({ ...state, err: '', success: res.data.msg });
		} catch (error) {
			error.response.data.msg &&
				setState({ ...state, err: error.response.data.msg, success: '' });
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
							Reset password
						</Typography>
						<form onSubmit={forgotPassword} className={classes.form} noValidate>
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

							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Submit
							</Button>
						</form>
					</div>
				</Container>
			)}
		</div>
	);
};

export default ForgotPassword;
