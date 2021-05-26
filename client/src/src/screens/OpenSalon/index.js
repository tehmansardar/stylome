import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const OpenSalon = () => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />

			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component='h3' variant='h5' align='center'>
						Open Your Salon
					</Typography>
					<form action='' noValidate>
						<Grid item xs={12}>
							<TextField
								required
								id='salon-name'
								name='salon-name'
								label='Enter You Salon Name'
								fullWidth
								autoComplete='false'
								color='secondary'
							/>
						</Grid>
						<Grid xs={12}>
							<h3 className='mt-6 font-medium font-sans'>
								You're welcoming for
							</h3>
							<RadioGroup row aria-label='gender' name='gender1'>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Female'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Male'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='both'
									control={<Radio />}
									label='Both'
									labelPlacement='start'
								/>
							</RadioGroup>
						</Grid>

						<div className={classes.buttons}>
							<Button
								variant='contained'
								color='secondary'
								className={classes.button}
								type='submit'
							>
								Submit
							</Button>
						</div>
					</form>
				</Paper>
			</main>
		</>
	);
};

export default OpenSalon;
