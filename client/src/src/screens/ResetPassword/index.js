import React from 'react';
import { Link } from 'react-router-dom';
import {
	createMuiTheme,
	ThemeProvider,
	Button,
	CssBaseline,
	TextField,
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

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FFCD06',
		},
		secondary: {
			main: '#000',
		},
	},
});

const ResetPassword = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Reset Password
					</Typography>
					<form className={classes.form} noValidate>
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
		</ThemeProvider>
	);
};

export default ResetPassword;