import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CustomServices from './CustomServices';

import HairImage from '../../../assets/images/hair-cut.svg';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		// flexGrow: 1,
		// width: '100%',
		// backgroundColor: theme.palette.background.paper,
	},
}));

const ServicesCarousel = (salon) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	let i = 0;
	console.log(salon.salon);

	return (
		<div>
			<div className='services-carousel flex flex-col items-center py-5 '>
				<h2 className='uppercase font-semibold	text-center'>Choose Serivces</h2>
				<div className='w-9/12 h-16 mt-2  align-middle'>
					<AppBar position='static' color='default'>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor='primary'
							textColor='primary'
							variant='scrollable'
							scrollButtons='auto'
							aria-label='scrollable auto tabs example'
						>
							{salon.salon.services.map((service, index) => (
								<Tab label={service.service} {...a11yProps(index)} />
							))}
							{/* <Tab label='Item Two' {...a11yProps(1)} />
							<Tab label='Item Three' {...a11yProps(2)} />
							<Tab label='Item Four' {...a11yProps(3)} />
							<Tab label='Item Five' {...a11yProps(4)} />
							<Tab label='Item Six' {...a11yProps(5)} />
							<Tab label='Item Seven' {...a11yProps(6)} /> */}
						</Tabs>
					</AppBar>
				</div>
			</div>
			{salon.salon.services.map((service, index) => (
				<TabPanel value={value} index={index}>
					<CustomServices service={service} />
				</TabPanel>
			))}
		</div>
	);
};

export default ServicesCarousel;
