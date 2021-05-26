import React from 'react';
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
		// backgroundColor: theme.palette.secondary.main,
		height: theme.spacing(15),
		width: theme.spacing(15),
		border: '5px solid #FFCD06',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Profile = () => {
	const classes = useStyles();
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar
					className={classes.avatar}
					src='https://media-exp1.licdn.com/dms/image/C5603AQEWM0rF0oTGLA/profile-displayphoto-shrink_800_800/0/1587677838659?e=1625702400&v=beta&t=8vtbC6Hl_niIcCj9V2IAbjqeNQdSz3kA0VGHguTraYI'
				/>
				<Typography component='h1' variant='h5'>
					Tehman Sardar
				</Typography>
				<form noValidate className='mt-5'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name='firstName'
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								value='Tehman'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								value='Sardar'
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
								value='tehmansardar@hotmail.com'
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
							/>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Save Changes
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Profile;
