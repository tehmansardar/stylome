import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Description = ({ salon }) => {
	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={12}>
					<div className='bg-gray-50 px-5 py-8'>
						<h3 className='font-bold'>Address</h3>
						<p className='tracking-wide text-gray-500'>
							{salon && salon.location.address}
						</p>
					</div>
				</Grid>
				<Grid item xs={12} md={12} lg={12}>
					<div className='bg-gray-50 px-5 py-8'>
						<h3 className='font-bold'>Contact Info</h3>
						<p className='tracking-wide text-gray-500'>
							{salon && salon.phone}
						</p>
					</div>
				</Grid>
				<Grid item xs={12} md={12} lg={12}>
					<div className='bg-gray-50 px-5 py-8'>
						<h3 className='font-bold'>Description</h3>
						<p className='tracking-wide text-gray-500'>
							{salon && salon.description}
						</p>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Description;
