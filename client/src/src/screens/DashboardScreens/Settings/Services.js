import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import ServiceModal from './ServiceModal';

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
		fontSize: 14,
		fontWeight: 700,
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
	iconButton: {
		background: '#FFCD06',
		color: '#fff',

		'&:hover': {
			background: '#FFCD06',
		},
	},
}));

const Services = () => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// console.log(openModal);

	return (
		<div>
			<Paper className={classes.paper}>
				<Container maxWidth='lg' className={classes.container}>
					<div className='w-full flex flex-col justify-center items-center text-center'>
						<Typography component='h1' variant='h5' className='mb-5'>
							Add Salon Services
						</Typography>
					</div>
					<Grid item xs={12} md={12} lg={12}>
						<div className=''>
							<label htmlFor='' className='mr-2'>
								Add New Serivce
							</label>
							<IconButton
								className={classes.iconButton}
								variant='contained'
								color='seondary'
								onClick={handleOpen}
							>
								<AddIcon />
							</IconButton>
						</div>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<ServiceModal open={open} onClose={handleClose} />
					</Grid>
				</Container>
			</Paper>
		</div>
	);
};

export default Services;
