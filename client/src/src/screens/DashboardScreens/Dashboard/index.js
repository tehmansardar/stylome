import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import Typography from '../Title';
import Deposits from '../Deposits';
import Orders from '../Orders';

import BankDetails from '../../../components/DashboardComponents/BankDetails';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				stylome
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	appBarSpacer: theme.mixins.toolbar,

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		borderRadius: 20,
		boxShadow: 'none',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	tips: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'rgba(255, 205, 6, 0.3)',
		padding: 40,
	},
	bank: {},
	fixedHeight: {
		height: 240,
	},
}));

const drawerWidth = 240;
const Dashboard = () => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<>
			{' '}
			<Container maxWidth='lg' className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={8}>
						<Paper className={`${fixedHeightPaper} ${classes.tips}`}>
							<Deposits />
						</Paper>
					</Grid>

					<Grid item xs={12} md={4} lg={4}>
						<Paper className={`${fixedHeightPaper} ${classes.bank}`}>
							<BankDetails />
						</Paper>
					</Grid>
					{/* Recent Orders */}
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Orders />
						</Paper>
					</Grid>
				</Grid>
			</Container>
			{/* <Box pt={4}>
				<Copyright />
			</Box> */}
		</>
	);
};

export default Dashboard;
