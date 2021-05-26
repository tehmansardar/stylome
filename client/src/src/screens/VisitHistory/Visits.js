import React from 'react';
import StarIcon from '@material-ui/icons/Star';

const Visits = () => {
	return (
		<div className='xs:mb-5'>
			<img
				className='w-60 rounded-2xl mr-3 mb-2'
				src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
				alt='salon name'
			/>
			<div className='flex flex-row justify-between items-center'>
				<div>
					<h3 className='text-xl font-medium'>Salon Name</h3>
					<p>Hair Cut · Simple</p>
					<span className=''>
						<StarIcon /> (18)
					</span>
				</div>
				<div>
					<b>$25</b>
				</div>
			</div>
		</div>
	);
};

export default Visits;
