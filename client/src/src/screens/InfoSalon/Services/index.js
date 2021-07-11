import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Service from './service';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	container: {
		margin: 0,
		padding: 0,
	},
}));

const Services = ({ services }) => {
	const classes = useStyles();

	return (
		<div className='services'>
			<Container>
				<Grid container className={classes.container}>
					<Grid item xs={12} md={12} lg={12}>
						{' '}
						{services
							? services.map((service) => (
									<Service key={service._id} serviceList={service} />
							  ))
							: 'No services'}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Services;
