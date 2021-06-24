import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Description = ({ salon }) => {
	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={6}>
					<div className='bg-gray-50 px-5 py-8'>
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
