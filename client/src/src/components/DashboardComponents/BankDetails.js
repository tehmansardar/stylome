import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	head: {
		textTransform: 'capitalize',
	},
	depositContext: {
		flex: 1,
		color: 'red',
	},
});

export default function Deposits() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<h2 className={classes.head}>Pay your bill</h2>
			<Typography component='p' variant='h5'>
				Bank Details
			</Typography>
			<Typography>HBL Pakistan</Typography>
			<Typography>xxxxx-xxxx-xxx</Typography>
			<Typography color='' className={classes.depositContext}>
				Salon expiry date is 15 March, 2019
			</Typography>
		</React.Fragment>
	);
}
