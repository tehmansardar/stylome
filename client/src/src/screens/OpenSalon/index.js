import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
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

	const token = useSelector((state) => state.token);

	const [state, setState] = useState({ err: '', success: '' });
	const { err, success } = state;
	const [name, setName] = useState('');
	const [gender, setGender] = useState({
		male: false,
		female: false,
		other: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			if (!name) {
				return setState({
					...state,
					err: "What's name of your salon",
					success: '',
				});
			}

			if (gender.male || gender.female || gender.other) {
				axios.post(
					'/api/salon/opensalon',
					{
						name: name,
						gender: gender,
					},
					{ headers: { Authorization: token } }
				);
			} else {
				return setState({
					...state,
					err: "To who you're serving?",
					success: '',
				});
			}
			setState({
				...state,
				err: '',
				success: 'Congratualtions! for opening salon',
			});
			window.location.href = '/';
		} catch (error) {
			return setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	return (
		<>
			<CssBaseline />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Container className={classes.container}>
						{success && <Success show={true} msg={success} />}
						{err && <Errors show={true} msg={err} />}
						<Typography component='h3' variant='h5' align='center'>
							Open Your Salon
						</Typography>
						<form autoComplete='off' onSubmit={handleSubmit}>
							<Grid item xs={12}>
								<TextField
									id='name'
									name='name'
									label='Enter You Salon Name'
									fullWidth
									color='secondary'
									defaultValue=''
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid xs={12}>
								<h3 className='mt-6 font-medium font-sans'>
									We are providing services to
								</h3>
								<FormControlLabel
									value='male'
									control={<Checkbox color='primary' checked={gender.male} />}
									label='Male'
									labelPlacement='start'
									onClick={() => setGender({ ...gender, male: !gender.male })}
								/>
								<FormControlLabel
									value='female'
									control={<Checkbox color='primary' checked={gender.female} />}
									label='Female'
									labelPlacement='start'
									onClick={() =>
										setGender({ ...gender, female: !gender.female })
									}
								/>
								<FormControlLabel
									value='other'
									control={<Checkbox color='primary' checked={gender.other} />}
									label='Other'
									labelPlacement='start'
									onClick={() => setGender({ ...gender, other: !gender.other })}
								/>
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
					</Container>
				</Paper>
			</main>
		</>
	);
};

export default OpenSalon;
