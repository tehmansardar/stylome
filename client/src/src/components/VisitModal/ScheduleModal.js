import React from 'react';
// Modal

import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import VisitModal from './index';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'items-stretch',
		justifyContent: 'center',
	},
	paper: {
		// backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		// boxShadow: theme.shadows[5],
		// padding: theme.spacing(2, 4, 3),
		'@media (min-width: 768px)': {
			width: '37%',
			height:'500px',
		},
		'@media (max-width: 660px)': {
			width: '90%',
		},
	},
}));

const ScheduleModal = ({ salon, open, onClose }) => {
	const classes = useStyles();

	return (
		<div>
			{/* Modal */}
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
						<VisitModal salon={salon} onClose={onClose} />
					</div>
				</Fade>
			</Modal>
			{/* End Modal */}
		</div>
	);
};

export default ScheduleModal;
