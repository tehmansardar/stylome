import React, { useState } from 'react';
// import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

import './style.css';

import CompleteModal from './CompleteModal';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	button: {
		width: '20%',
		fontSize: '10px',
		textTransform: 'capitalize',
	},
}));

const Visits = ({ visit }) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className='xs:mb-5 mr-6 cursor-pointer visitHistory'>
			<img
				className='lg:w-60 md:w-60 rounded-2xl mr-3 mb-2'
				src={
					visit.salons.showcase
						? visit.salons.showcase
						: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
				}
				alt='salon name'
			/>
			<div className='flex flex-row justify-between px-2 items-center'>
				<div>
					<h3 className='text-xl font-medium capitalize'>
						{visit.salons.name}
					</h3>
					<p className='capitalize text-sm'>
						{visit.services.service} · {visit.customService}
					</p>
					<span className='text-sm flex items-center'>
						<AccessTimeIcon />{' '}
						<p>{visit.slots.map((slot) => slot.slot + ' ')}</p>
					</span>
				</div>
				<div className='flex flex-col items-center justify-between'>
					<b>{visit.price} Rs</b>
					{visit.status === 0 && (
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							size='small'
							onClick={handleOpen}
						>
							Finish
						</Button>
					)}
				</div>
			</div>
			<CompleteModal visit={visit} open={open} onClose={handleClose} />
		</div>
	);
};

export default Visits;
