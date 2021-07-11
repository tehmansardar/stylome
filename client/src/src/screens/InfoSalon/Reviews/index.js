import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import Review from './Review';

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

const Reviews = ({ id }) => {
	const classes = useStyles();

	const [data, setData] = useState([]);

	useEffect(async () => {
		const res = await axios.post('/api/visit/getRating', { salonId: id });
		setData(res.data);
	}, [id]);

	return (
		<div className='services'>
			<Container>
				<Grid container className={classes.container}>
					<Grid item xs={12} md={12} lg={12}>
						{data.length > 0
							? data.map((d) => <Review key={d._id} data={d} />)
							: 'No Reviews'}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Reviews;
