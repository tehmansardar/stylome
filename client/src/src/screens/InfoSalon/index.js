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

import ScheduleModal from '../../components/VisitModal/ScheduleModal';

import Tabs from './Tabs';
import MapLocation from './MapLocation';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchClearVisit } from '../../../redux/actions/visitActions';

import axios from 'axios';

const InfoScreen = () => {
	const [loading, setLoading] = useState(true);

	const SalonId = useParams('salonId');
	const [salon, setSalon] = useState('');
	const [location, setLocation] = useState({
		address: '',
		lat: null,
		lng: null,
	});

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

	function ParseTime(s) {
		const d = new Date();
		const c = s.split(':');
		const hh = parseInt(c[0]);
		const mm = parseInt(c[1]);
		d.setHours(hh, mm);
		return d;
	}

	const date = new Date();
	// if (
	// 	date > ParseTime(salon.timing.opening) ||
	// 	date < ParseTime(salon.timing.closing)
	// ) {
	// 	console.log(ParseTime(salon.timing.opening));
	// }

	// eslint-disable-next-line no-restricted-globals

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
									{loading === false &&
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

									{/* {signin && (
										<Button
											className='m-visit-btn'
											variant='contained'
											color='primary'
											size='small'
											onClick={handleOpen}
										>
											Schedule Visit
										</Button>
									)} */}

									{/* <span className='share'>
							<ShareIcon /> Share
						</span>
						<span className='favorite'>
							<FavoriteIcon /> Favorite
						</span> */}
								</div>
							</div>
							<div
								className='showcase-wrapper'
								style={{
									background: `url( ${
										salon.showcase
											? salon.showcase
											: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
									}) no-repeat center center/cover`,
								}}
							></div>
							{/* <img
								src={
									salon.showcase
										? salon.showcase
										: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
								}
								alt='stylo barbers'
								loading='lazy'
								// className='lg:h-96'
							/> */}
						</div>
						{/* facilities */}
						{/* <div className='facilities'>
							<h3>Provide Services Like</h3>
							<p>{salon.services.map((service) => `${service.service} · `)}</p>
						</div> */}
						{/* <hr className='hr-line' /> */}
						{/* Services */}
						{/* <Services /> */}
						{/* <hr className='hr-line' /> */}
						{/* Description */}
						{/* <div className='description'>
							<p className='desc'>{salon.description}</p>
						</div>
						<hr className='hr-line' /> */}
						<div className='flex'>
							<Tabs salon={salon} salonId={SalonId.salonId} />
							<MapLocation loc={salon?.location} />
						</div>

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
