import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Rating from './Rating';

const Review = ({ data }) => {
	console.log(data);
	return (
		<div className='review mb-4'>
			<div className='flex bg-gray-50 px-4 py-4 rounded-2xl'>
				<Avatar
					alt={data.users.fname}
					src={data.users.avatar ? data.users.avatar : ''}
					style={{ marginRight: '15px' }}
				/>
				<div>
					<h3 className='capitalize mb-0'>{`${data.users.fname} ${data.users.lname}`}</h3>
					<div className='mb-5'>
						<span className='text-gray-500 italic text-xs'>
							Service Provider
						</span>{' '}
						<Chip
							variant='outlined'
							color='secondary'
							size='small'
							label={data.staff.name}
							avatar={<Avatar>{data.staff.name.charAt(0)}</Avatar>}
						/>
					</div>
					<Rating stars={data.rating.stars} className='mb-5' />
					<p className=''>{data.rating.review}</p>
				</div>
			</div>
		</div>
	);
};

export default Review;
