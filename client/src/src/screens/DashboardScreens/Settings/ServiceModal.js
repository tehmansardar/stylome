import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import { TextField } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Success from '../../../components/utils/Notification.js/Success';
import Errors from '../../../components/utils/Notification.js/Errors';

import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: '7px',
	},
	h3: {
		fontSize: '14px',
		fontWeight: 500,
	},
	input: {
		border: '2px solid #000',
		borderRadius: '5px',
		padding: '5px 10px',
	},
	cutomPaper: {
		// height: '100px',
		// width: '30%',
		marginRight: '20px',
		padding: 5,
	},
	custom: {
		width: '100%',
		fontSize: '14px',
		padding: '2px 5px',
		border: '1px solid #000',
		borderRadius: '5px',
	},
	slots: {
		// width: '10%',
		border: '1px solid #000',
		borderRadius: '5px',
		marginLeft: 3,
		fontSize: '14px',
		padding: '2px 5px',
	},
	price: {
		// width: '10%',
		border: '1px solid #000',
		fontSize: '14px',
		borderRadius: '5px',
		marginLeft: 3,
		padding: '2px 5px',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	btn: {
		marginTop: 15,
	},
}));

const initialState = {
	err: '',
	success: '',
	service: '',
	primary: {
		name: '',
		slots: 0,
		price: '',
		currency: 'RS',
	},
	secondary: {
		name: '',
		slots: 0,
		price: '',
		currency: 'RS',
	},
	tertiary: {
		name: '',
		slots: 0,
		price: '',
		currency: 'RS',
	},
};

export default function ServiceModal({ open, onClose }) {
	const classes = useStyles();

	const token = useSelector((state) => state.token);

	const [state, setState] = useState(initialState);
	const { err, success, service, primary, secondary, tertiary } = state;

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			if (
				!service ||
				!primary.name ||
				!secondary.name ||
				!tertiary.name ||
				!primary.slots ||
				!secondary.slots ||
				!tertiary.slots ||
				!primary.price ||
				!secondary.price ||
				!tertiary.price
			) {
				return setState({
					...state,
					err: 'Add information properly',
					success: '',
				});
			}
			if (
				primary.slots < 0 ||
				secondary.slots < 0 ||
				tertiary.slots < 0 ||
				primary.price < 0 ||
				secondary.price < 0 ||
				tertiary.price < 0
			) {
				return setState({
					...state,
					err: 'Remove the -ve values from slots and price',
					success: '',
				});
			}

			axios.post(
				'/api/salon/addService',
				{
					service: service,
					customServices: {
						primary: primary,
						secondary: secondary,
						tertiary: tertiary,
					},
				},
				{
					headers: { Authorization: token },
				}
			);

			setState({
				...state,
				err: '',
				success: 'New service added successfully',
			});
			onClose(false);
		} catch (error) {
			return setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	return (
		<div>
			{/* <button type='button' onClick={handleOpen}>
				react-transition-group
			</button> */}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{success && <Success show={true} msg={success} />}
						{err && <Errors show={true} msg={err} />}
						<Container maxWidth='lg' className={classes.container}>
							<h1 className='text-center text-2xl font-bold'>
								ADD NEW SERVICE
							</h1>
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={12}>
									<h3 className={classes.h3}>Add New Service</h3>
									<InputBase
										style={{ width: '100%' }}
										className={classes.input}
										placeholder='try this, "Hair Cut"'
										inputProps={{ 'aria-label': 'try this, "Hair Cut' }}
										type='text'
										name='service'
										defaultValue=''
										onChange={(e) =>
											setState({ ...state, service: e.target.value })
										}
									/>
								</Grid>
							</Grid>
							<br />
							<h3 className={classes.h3}>Add Custom Services</h3>

							{/* <div className='flex justify-between'> */}
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Normal Hair"'
											name='primaryName'
											defaultValue=''
											onChange={(e) =>
												setState((s) => ({
													...s,
													primary: { ...s.primary, name: e.target.value },
												}))
											}
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
												InputProps={{ inputProps: { min: 0, max: 10 } }}
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														primary: { ...s.primary, slots: e.target.value },
													}))
												}
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='number'
												placeholder='Price'
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														primary: { ...s.primary, price: e.target.value },
													}))
												}
											/>
										</div>
									</Paper>
								</Grid>

								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Stylish Hair"'
											defaultValue=''
											onChange={(e) =>
												setState((s) => ({
													...s,
													secondary: { ...s.secondary, name: e.target.value },
												}))
											}
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														secondary: {
															...s.secondary,
															slots: e.target.value,
														},
													}))
												}
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='number'
												placeholder='Price'
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														secondary: {
															...s.secondary,
															price: e.target.value,
														},
													}))
												}
											/>
										</div>
									</Paper>
								</Grid>
								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Long Hair"'
											defaultValue=''
											onChange={(e) =>
												setState((s) => ({
													...s,
													tertiary: { ...s.tertiary, name: e.target.value },
												}))
											}
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														tertiary: { ...s.tertiary, slots: e.target.value },
													}))
												}
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='number'
												placeholder='Price'
												defaultValue=''
												onChange={(e) =>
													setState((s) => ({
														...s,
														tertiary: { ...s.tertiary, price: e.target.value },
													}))
												}
											/>
										</div>
									</Paper>
								</Grid>
							</Grid>
							{/* </div> */}
							<div className={classes.buttons}>
								<Button
									className={classes.btn}
									color='primary'
									variant='contained'
									onClick={handleAdd}
								>
									Add
								</Button>
							</div>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
