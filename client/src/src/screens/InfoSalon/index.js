import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import { Button } from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShareIcon from '@material-ui/icons/Share';

import Services from '../../components/Services';
import ScheduleModal from '../../components/VisitModal/ScheduleModal';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchClearVisit } from '../../../redux/actions/visitActions';

import axios from 'axios';

const InfoScreen = () => {
	const [loading, setLoading] = useState(true);

	const SalonId = useParams('salonId');
	const [salon, setSalon] = useState('');

	// Modal
	const signin = useSelector((state) => state.auth.isLogged);

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		dispatch(dispatchClearVisit());
		setOpen(false);
	};
	// End Modal

	useEffect(() => {
		const salonInfo = async () => {
			try {
				const res = await axios.get(
					`/api/search/salonfullinfo/${SalonId.salonId}`
				);
				setSalon(res.data);
				setLoading(false);
			} catch (error) {
				return console.log(error.message);
			}
		};
		salonInfo();
	}, []);

	console.log(salon);

	return (
		<>
			{loading ? (
				<>
					<div className='h-screen flex justify-center items-center'>
						<div className='flex justify-center items-center'>
							<CircularProgress color='primary' />
						</div>
					</div>
				</>
			) : (
				<>
					<div className='InfoScreen lg:mx-20 lg:my-5'>
						{/* Header */}
						<div className='info__header'>
							<h1> {salon.name}</h1>
							<div className='like-location'>
								<div className='like-location_left'>
									{/* <span className='rating'>
							<StarIcon /> <b>4.85</b> (18)
						</span> */}
									<span className='location'>
										<LocationOnIcon /> {salon.location.city},{' '}
										{salon.location.country}
									</span>
								</div>
								<div className='like-location-right'>
									{signin && (
										<Button
											className='m-visit-btn'
											variant='contained'
											color='primary'
											size='small'
											onClick={handleOpen}
										>
											Schedule Visit
										</Button>
									)}

									{/* <span className='share'>
							<ShareIcon /> Share
						</span>
						<span className='favorite'>
							<FavoriteIcon /> Favorite
						</span> */}
								</div>
							</div>
							<img
								src={
									salon.showcase
										? salon.showcase
										: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
								}
								alt='stylo barbers'
								loading='lazy'
								className='lg:h-96'
							/>
						</div>
						{/* facilities */}
						<div className='facilities'>
							<h3>Provide Services Like</h3>
							<p>{salon.services.map((service) => `${service.service} · `)}</p>
						</div>
						<hr className='hr-line' />
						{/* Services */}
						{/* <Services /> */}
						{/* <hr className='hr-line' /> */}
						{/* Description */}
						<div className='description'>
							<p className='desc'>{salon.description}</p>
						</div>
						<hr className='hr-line' />

						{/* map */}
						{/* <div className='map'></div> */}
						<ScheduleModal salon={salon} open={open} onClose={handleClose} />
					</div>
				</>
			)}
		</>
	);
};

export default InfoScreen;
