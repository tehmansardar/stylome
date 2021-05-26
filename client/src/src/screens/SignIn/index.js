import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Typography,
	Container,
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

const SignIn = () => {
	const classes = useStyles();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate autoComplete='off'>
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
						autoComplete='current-password'
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
	);
};

export default SignIn;
