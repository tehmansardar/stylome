import React from 'react';
import SimpleHair from '../../../assets/images/simple-hair.svg';

const CustomServices = () => {
	return (
		<div className='flex flex-col py-3 px-5'>
			<h2 className='uppercase font-semibold'>Choose Serivces</h2>
			<div className='custom-services-list flex flex-row justify-center my-3'>
				<div className='custom-servicee customServiceSelect w-32 py-2 mx-2 rounded-3xl'>
					<div className='flex flex-col justify-center items-center'>
						<p>Simple Hair</p>
						<img src={SimpleHair} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>$5.00</span>
						<span>30min</span>
					</p>
				</div>

				<div className='custom-servicee w-32 py-2 mx-2 rounded-3xl'>
					<div className='flex flex-col justify-center items-center'>
						<p>Stylish Hair</p>
						<img src={SimpleHair} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>$5.00</span>
						<span>30min</span>
					</p>
				</div>

				<div className='custom-servicee w-32 py-2 mx-2 rounded-3xl'>
					<div className='flex flex-col justify-center items-center'>
						<p>Long Hair</p>
						<img src={SimpleHair} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>$5.00</span>
						<span>30min</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CustomServices;
