import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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

export default function ServiceModal({ open, onClose }) {
	const classes = useStyles();

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
						<Container maxWidth='lg' className={classes.container}>
							<h3 className={classes.h3}>Add New Service</h3>
							<InputBase
								className={classes.input}
								placeholder='try this, "Hair Cut"'
								inputProps={{ 'aria-label': 'search google maps' }}
							/>

							<br />
							<br />
							<h3 className={classes.h3}>Add Custom Services</h3>
							{/* <div className='flex justify-between'> */}
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Simple Hair"'
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='text'
												placeholder='Price'
											/>
										</div>
									</Paper>
								</Grid>
								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Simple Hair"'
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='text'
												placeholder='Price'
											/>
										</div>
									</Paper>
								</Grid>
								<Grid item xs={12} md={12} lg={4}>
									<Paper elevation={3} className={classes.cutomPaper}>
										<InputBase
											className={classes.custom}
											placeholder='try this, "Simple Hair"'
										/>
										<div className='mt-2'>
											<InputBase
												className={classes.slots}
												type='number'
												placeholder='Slots'
											/>
										</div>
										<div className='mt-2'>
											<InputBase
												className={classes.price}
												type='text'
												placeholder='Price'
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
