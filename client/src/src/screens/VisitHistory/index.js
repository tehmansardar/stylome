import React from 'react';
import Visits from './Visits';

const VisitHistory = () => {
	return (
		<div className='p-5'>
			<div className=''>
				<h2 className='font-medium text-3xl mb-5'>Your Visits</h2>
				<div className='flex justify-around flex-wrap'>
					<Visits />
					<Visits />
					<Visits />
					<Visits />
					<Visits />
					<Visits />
					<Visits />
					<Visits />
				</div>
			</div>
		</div>
	);
};

export default VisitHistory;
