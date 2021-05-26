import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Modal

import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import VisitModal from '../VisitModal';

const Salon = () => {
	// Modal

	const useStyles = makeStyles((theme) => ({
		modal: {
			display: 'flex',
			alignItems: 'items-stretch',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// End Modal

	return (
		<div>
			<div className='Salon'>
				<div className='salon-left'>
					<img
						src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
						alt='salon name'
					/>
					<div>
						<div className='flex justify-between items-center'>
							<div>
								<Link to='/salon-info'>
									<h3>Salon Name</h3>
								</Link>
								<p>4 barbers · 3 Messures</p>
								<p>
									<span>Wifi · Air Condition</span>
								</p>
								<span className='rating'>
									<StarIcon /> (18)
								</span>
							</div>
							<div className='m-visit-btn-hide lg:hidden xl:hidden '>
								<Button
									className='m-visit-btn'
									variant='contained'
									color='primary'
									size='small'
									onClick={handleOpen}
								>
									Schedule Visit
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='salon-right'>
					<FavoriteBorderIcon />
					<Button className='schedule-visit' onClick={handleOpen}>
						Schedule Visit
					</Button>
					<Button className='salon-status'>Open Now</Button>
				</div>
			</div>
			<hr className='line' />

			{/* Modal */}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<VisitModal />
				</Fade>
			</Modal>
			{/* End Modal */}
		</div>
	);
};

export default Salon;
