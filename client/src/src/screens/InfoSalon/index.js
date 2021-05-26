import React from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShareIcon from '@material-ui/icons/Share';

import Services from '../../components/Services';

const InfoScreen = () => {
	const SalonId = useParams('salonId');
	console.log('From Salon', SalonId.salonId);
	return (
		<div className='InfoScreen'>
			{/* Header */}
			<div className='info__header'>
				<h1>Stylo Barbers {SalonId.salonId}</h1>
				<div className='like-location'>
					<div className='like-location_left'>
						<span className='rating'>
							<StarIcon /> <b>4.85</b> (18)
						</span>
						<span className='location'>
							<LocationOnIcon /> Lahore, Paksitan
						</span>
					</div>
					<div className='like-location-right'>
						<span className='share'>
							<ShareIcon /> Share
						</span>
						<span className='favorite'>
							<FavoriteIcon /> Favorite
						</span>
					</div>
				</div>
				<img
					src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
					alt='stylo barbers'
					loading='lazy'
				/>
			</div>
			{/* facilities */}
			<div className='facilities'>
				<h3>We have</h3>
				<p>Wifi · Air Condition</p>
			</div>
			<hr className='hr-line' />
			{/* Services */}
			<Services />
			<hr className='hr-line' />
			{/* Description */}
			<div className='description'>
				<p className='desc'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<hr className='hr-line' />

			{/* map */}
			<div className='map'></div>
		</div>
	);
};

export default InfoScreen;
