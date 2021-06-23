import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { InputBase, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// Rating
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import { useSelector } from 'react-redux';

import './style.css';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		// width: '90%',

		'@media (min-width: 768px)': {
			width: '50%',
		},
		'@media (max-width: 660px)': {
			width: '90%',
		},
	},
	input: {
		border: '2px solid #FFCE0C',
		borderRadius: '5px',
		padding: '5px 10px',
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

const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon />,
		label: 'Very Dissatisfied',
	},
	2: {
		icon: <SentimentDissatisfiedIcon />,
		label: 'Dissatisfied',
	},
	3: {
		icon: <SentimentSatisfiedIcon />,
		label: 'Neutral',
	},
	4: {
		icon: <SentimentSatisfiedAltIcon />,
		label: 'Satisfied',
	},
	5: {
		icon: <SentimentVerySatisfiedIcon />,
		label: 'Very Satisfied',
	},
};

function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};

// End

const CompleteModal = ({ visit, open, onClose }) => {
	const classes = useStyles();
	const [rating, setRating] = useState(1);
	const [review, setReview] = useState('');

	const token = useSelector((state) => state.token);

	const handleComplete = async (e) => {
		e.preventDefault();
		if (!rating || !review) {
			return console.log('Kindly share your experience');
		}
		await axios.patch(
			'/api/visit/clearVisit',
			{
				visitId: visit._id,
				stars: rating,
				review: review,
			},
			{
				headers: { Authorization: token },
			}
		);
		onClose(false);
	};

	return (
		<div className='completeModal'>
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
					<div className={`${classes.paper}`}>
						{/* Rating */}
						<div className=''>
							<h3 className='text-center text-base font-normal my-4'>
								How was your experience
							</h3>
							<div className=''>
								<Box component='fieldset' mb={2} borderColor='transparent'>
									<Rating
										name='customized-icons'
										defaultValue={1}
										size='large'
										getLabelText={(value) => customIcons[value].label}
										IconContainerComponent={IconContainer}
										onChange={(_, value) => {
											setRating(value);
										}}
									/>
								</Box>
							</div>

							{/* Review */}
							<form action='' autoComplete='off'>
								<Grid container spacing={3}>
									<Grid item xs={12} md={12} lg={12}>
										<InputBase
											style={{ width: '100%', marginBottom: 10 }}
											className={classes.input}
											placeholder='How was the service?'
											inputProps={{ 'aria-label': 'Your review' }}
											type='text'
											name='review'
											defaultValue=''
											onChange={(e) => setReview(e.target.value)}
										/>
									</Grid>
								</Grid>
								<div className={classes.buttons}>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										type='button'
										onClick={handleComplete}
									>
										Done
									</Button>
								</div>
							</form>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default CompleteModal;
