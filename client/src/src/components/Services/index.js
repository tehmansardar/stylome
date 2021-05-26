import React from 'react';
import './style.css';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import HairCut from '../../../assets/images/hair-cut.svg';

const Services = () => {
	return (
		<div className='services'>
			<h3>Services we provide</h3>
			<div className='services-container'>
				<div className='service-left'>
					<h4>Hair Cut</h4>
					<img src={HairCut} alt='hair cut' />
				</div>
				<div className='servcie-right'>
					<div className='custom-services'>
						<div className='custom-service'>
							<h5>Normal Hair</h5>
							<div className='time-price'>
								<LocalOfferIcon className='localOffer' /> $5.00
								<AccessTimeIcon className='accesstime' /> 30min
							</div>
						</div>
						<div className='dot'>·</div>
						<div className='custom-service'>
							<h5>Stylish Hair</h5>
							<div className='time-price'>
								<LocalOfferIcon className='localOffer' /> $7.00
								<AccessTimeIcon className='accesstime' /> 1hr
							</div>
						</div>
						<div className='dot'>·</div>
						<div className='custom-service'>
							<h5>Stylish Hair</h5>
							<div className='time-price'>
								<LocalOfferIcon className='localOffer' /> $10.00
								<AccessTimeIcon className='accesstime' /> 1hr 30min
							</div>
						</div>
						<div className='dot'>·</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
