import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import goal from '../../../assets/images/goal.svg';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	left: {
		display: 'flex',
		flexDirection: 'column',
		flex: 0.8,
	},
	right: {
		display: 'flex',
		flexDirection: 'column',
		flex: 0.2,
	},
	heading: {
		color: '#000',
		fontWeight: 700,
		fontSize: 18,
		letterSpacing: '1px',
		marginBottom: '0.5rem',
	},
	p: {
		fontSize: '1rem',
		letterSpacing: '1px',
		marginBottom: '0.5rem',
		color: '#000',
	},
	btn: {
		boxShadow: 'none',
		width: '100px',
		borderRadius: '12px',
		fontWeight: 700,
		textTransform: 'capitalize',
	},
});

export default function Deposits() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<div className='flex justify-around items-center'>
				<div>
					<h3 className={`${classes.heading}`}>
						How to build your success on Stylome
					</h3>
					<p className={classes.p}>
						The key to your success on Stylome is the brand you build for
						yourself through your customer service reputation.
					</p>
					<Button variant='contained' color='secondary' className={classes.btn}>
						Explore
					</Button>
				</div>
				<div className='w-60'>
					<img src={goal} alt='goal' />
				</div>
			</div>
		</React.Fragment>
	);
}
