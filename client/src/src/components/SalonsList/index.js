import React from 'react';
import './style.css';
import Salon from '../Salon';
const SalonsList = ({ salons }) => {
	return (
		<div className='SalonsList'>
			{salons.map((salon) => (
				<Salon salon={salon} />
			))}
		</div>
	);
};

export default SalonsList;
