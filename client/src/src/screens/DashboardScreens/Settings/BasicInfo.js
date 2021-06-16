import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Divider from '@material-ui/core/Divider';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { getHours } from 'date-fns';

import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	appBarSpacer: theme.mixins.toolbar,

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		borderRadius: 20,
		boxShadow: 'none',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	fixedHeight: {
		height: 240,
	},
	fieldHeading: {
		fontSize: '14px',
		fontWeight: 500,
	},
	input: {
		display: 'none',
	},
	description: {
		// height: '200px !important',
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

const drawerWidth = 240;

function ParseTime(s) {
	const d = new Date();
	const c = s.split(':');
	const hh = parseInt(c[0]);
	const mm = parseInt(c[1]);
	d.setHours(hh, mm);
	return d;
}

const BasicInfo = () => {
	const classes = useStyles();

	const token = useSelector((state) => state.token);
	const salons = useSelector((state) => state.salons);

	const [state, setState] = useState({ err: '', success: '' });

	const [name, setName] = useState('');
	const [gender, setGender] = useState({
		male: null,
		female: null,
		other: null,
	});
	const [opening, setOpening] = useState(ParseTime(salons.timing.opening));
	const [closing, setClosing] = useState(ParseTime(salons.timing.closing));
	const [showcase, setShowcase] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [phone, setPhone] = useState('');
	const [description, setDescription] = useState('');

	const storetiming = (s) => {
		let hh = s.getHours();
		hh = hh > 10 ? hh : '0' + hh;
		let mm = s.getMinutes();
		mm = mm > 10 ? mm : '0' + mm;

		return `${hh}:${mm}`;
	};

	const handleUpdate = async () => {
		try {
			if (storetiming(opening) >= storetiming(closing)) {
				return setState({
					...state,
					err: 'Opening time should be less than Closing time',
					success: '',
				});
			}

			axios.patch(
				'/api/salon/basicsalonInfo',
				{
					name: name ? name : salons.name,
					timing: {
						opening: opening ? storetiming(opening) : salons.timing.opening,
						closing: closing ? storetiming(closing) : salons.timing.closing,
					},
					location: {
						address: address ? address : salons.location.address,
						postalCode: postalCode ? postalCode : salons.location.postalCode,
						city: city ? city : salons.location.city,
						province: province ? province : salons.location.province,
						country: country ? country : salons.location.country,
					},
					phone: phone ? phone : salons.phone,
					description: description ? description : salons.description,
				},
				{
					headers: { Authorization: token },
				}
			);
			setState({ ...state, err: '', success: 'Infomation has been updated' });
		} catch (error) {
			return setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	console.log(state.err, state.success);

	return (
		<div>
			<Paper className={classes.paper}>
				<Container maxWidth='lg' className={classes.container}>
					<div className='w-full flex flex-col justify-center items-center'>
						<Typography component='h1' variant='h5' className='mb-5'>
							Basic Salon Info
						</Typography>
						<form className='max-w-lg' autoComplete='off'>
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={12}>
									<h3 className={classes.fieldHeading}>Salon Name</h3>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='name'
										label='Salon Name'
										name='name'
										autoFocus
										defaultValue={salons.name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<h3 className={classes.fieldHeading}>
										We provide services to
									</h3>
									<FormControlLabel
										value='male'
										control={
											<Checkbox color='primary' checked={salons.gender.male} />
										}
										label='Male'
										labelPlacement='start'
									/>
									<FormControlLabel
										value='female'
										control={
											<Checkbox
												color='primary'
												checked={salons.gender.female}
											/>
										}
										label='Female'
										labelPlacement='start'
									/>
									<FormControlLabel
										value='other'
										control={<Checkbox color='primary' />}
										label='Other'
										labelPlacement='start'
										checked={salons.gender.other ? true : false}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={6}>
									{/* <h3 className={classes.fieldHeading}>Open At</h3> */}
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											ampm={false}
											minutesStep='30'
											margin='normal'
											id='time-picker'
											label='Open At'
											value={opening}
											onChange={setOpening}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item xs={12} md={12} lg={6}>
									{/* <h3 className={classes.fieldHeading}>Close At</h3> */}
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											ampm={false}
											minutesStep='30'
											margin='normal'
											id='time-picker'
											label='Close At'
											value={closing}
											onChange={setClosing}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<label htmlFor=''>Add cover to salon</label>
									<input
										accept='image/*'
										className={classes.input}
										id='icon-button-file'
										type='file'
									/>
									<label htmlFor='icon-button-file'>
										<IconButton
											color='primary'
											aria-label='upload picture'
											component='span'
											size='medium'
										>
											<PhotoCamera />
										</IconButton>
									</label>
									<Divider />
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<h3 className={classes.fieldHeading}>Location</h3>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='address'
										label='Salon Address'
										name='address'
										defaultValue={salons.location.address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='postalCode'
										label='Postal Code'
										name='postalCode'
										defaultValue={salons.location.postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='city'
										label='City'
										name='city'
										defaultValue={salons.location.city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='city'
										label='Province'
										name='province'
										defaultValue={salons.location.province}
										onChange={(e) => setProvince(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='country'
										label='Country'
										name='country'
										defaultValue={salons.location.country}
										onChange={(e) => setCountry(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={6}>
									<label className={classes.fieldHeading}>Contact No</label>
									<TextField
										// variant='outlined'
										margin='normal'
										required
										fullWidth
										id='phone'
										label='Contact Number'
										name='phone'
										defaultValue={salons.phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<label className={classes.fieldHeading}>About Salon</label>
									<TextField
										variant='filled'
										margin='normal'
										required
										fullWidth
										id='name'
										label='Description'
										name='description'
										size='medium'
										className={classes.description}
										defaultValue={salons.description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Grid>
								<Button
									className={classes.button}
									variant='contained'
									color='primary'
									onClick={handleUpdate}
								>
									Save
								</Button>
							</Grid>
						</form>
					</div>
				</Container>
			</Paper>
		</div>
	);
};

export default BasicInfo;
