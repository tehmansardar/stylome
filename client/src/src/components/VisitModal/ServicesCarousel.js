import React from 'react';
import Slider from 'react-slick';

import CustomServices from './CustomServices';

import HairImage from '../../../assets/images/hair-cut.svg';

const ServicesCarousel = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
	};

	return (
		<div>
			<div className='services-carousel flex flex-col items-center py-5 '>
				<h2 className='uppercase font-semibold	text-center'>Choose Serivces</h2>
				<div className='w-9/12 h-16 bg-gray-200 mt-2 px-10 align-middle'>
					<Slider {...settings} className='silck-services'>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
						<div className='service-list'>
							<img src={HairImage} alt='' />
						</div>
					</Slider>
				</div>
			</div>
			<CustomServices />
		</div>
	);
};

export default ServicesCarousel;
