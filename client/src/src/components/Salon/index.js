import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import ScheduleModal from '../VisitModal/ScheduleModal';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchClearVisit } from '../../../redux/actions/visitActions';

const Salon = ({ salon }) => {
	// Modal
	const signin = useSelector((state) => state.auth.isLogged);

	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		dispatch(dispatchClearVisit());
		setOpen(false);
	};

	function ParseTime(s) {
		const d = new Date();
		const c = s.split(':');
		const hh = parseInt(c[0]);
		const mm = parseInt(c[1]);
		d.setHours(hh, mm);
		return d;
	}
	const date = new Date();

	console.log(salon);

	return (
		<div>
			<div className='Salon'>
				<div className='salon-left'>
					<img
						src={
							salon.showcase
								? salon.showcase
								: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
						}
						alt={salon.name}
					/>
					<div>
						<div className='flex justify-between items-center'>
							<div>
								<Link to={`/salon-info/${salon._id}`}>
									<h3>{salon.name}</h3>
								</Link>
								<p> Providing {salon.services.length} services</p>
								<p>
									<span>{salon.staff.length} Staff members</span>
								</p>
								<span className='rating'>
									<StarIcon /> (18)
								</span>
							</div>
							<div className='m-visit-btn-hide lg:hidden xl:hidden '>
								{salon &&
									(date > ParseTime(salon.timing.opening) &&
									date < ParseTime(salon.timing.closing) ? (
										signin ? (
											<Button
												className='m-visit-btn'
												variant='contained'
												color='primary'
												size='small'
												onClick={handleOpen}
											>
												Schedule Visit
											</Button>
										) : (
											''
										)
									) : (
										<Button variant='outlined' color='secondary' size='small'>
											Closed
										</Button>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className='salon-right'>
					{/* <FavoriteBorderIcon /> */}

					{salon &&
						(date > ParseTime(salon.timing.opening) &&
						date < ParseTime(salon.timing.closing) ? (
							signin ? (
								<>
									<Button className='schedule-visit' onClick={handleOpen}>
										Schedule Visit
									</Button>
									<Button className='salon-status'>Open Now</Button>
								</>
							) : (
								''
							)
						) : (
							<Button
								className='schedule-closed'
								color='secondary'
								variant='outlined'
							>
								Closed
							</Button>
						))}
				</div>
			</div>
			<hr className='line' />
			<ScheduleModal salon={salon} open={open} onClose={handleClose} />
		</div>
	);
};

export default Salon;
