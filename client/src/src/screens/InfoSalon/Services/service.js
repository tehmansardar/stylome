import React from 'react';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import './style.css';

const service = ({ serviceList }) => {
	return (
		<div className='service mb-4'>
			<div className='bg-gray-50 px-4 py-4 rounded-2xl'>
				<h1 className='text-xl font-bold mb-5 capitalize'>
					{serviceList.service}
				</h1>
				<div className='flex justify-center flex-wrap'>
					<div className='flex flex-col items-center justify-center bg-white p-4 mr-4 rounded-2xl custom'>
						<p className='capitalize'>
							{serviceList.customServices.primary.name}
						</p>
						<Brightness1Icon />
						<div className='flex justify-between items-center'>
							<p className='mr-2 capitalize'>
								{serviceList.customServices.primary.slots * 30}min
							</p>
							<p>{serviceList.customServices.primary.price}Rs</p>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center bg-white p-4 mr-4 rounded-2xl custom'>
						<p className='capitalize'>
							{serviceList.customServices.secondary.name}
						</p>
						<Brightness1Icon />
						<div className='flex justify-between items-center'>
							<p className='mr-2 capitalize'>
								{serviceList.customServices.secondary.slots * 30}min
							</p>
							<p>{serviceList.customServices.secondary.price}Rs</p>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center bg-white p-4 mr-4 rounded-2xl custom'>
						<p className='capitalize'>
							{serviceList.customServices.tertiary.name}
						</p>
						<Brightness1Icon />
						<div className='flex justify-between items-center'>
							<p className='mr-4 capitalize'>
								{serviceList.customServices.tertiary.slots * 30}min
							</p>
							<p>{serviceList.customServices.tertiary.price}Rs</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default service;
