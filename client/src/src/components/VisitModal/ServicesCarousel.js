import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CustomServices from './CustomServices';

import { useDispatch } from 'react-redux';
import {
	dispatchServiceId,
	dispatchCustomService,
} from '../../../redux/actions/visitActions';

const AntTabs = withStyles({
	root: {
		background: '#FFF',
	},
	indicator: {
		borderBottom: '3px solid #FFCD06',
		backgroundColor: '#FFCD06',
	},
	selected: {
		background: '#fff',
	},
})(Tabs);

const AntTab = withStyles({
	root: {
		color: '#000',
		fontWeight: 'bold',
	},
	indicator: {
		backgroundColor: '#000',
	},
})(Tab);

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
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

const ServicesCarousel = (salon) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const dispatch = useDispatch();
	const serviceId = (id) => {
		return dispatch(dispatchServiceId(id));
	};

	useEffect(() => {
		serviceId(salon.salon.services[0]._id);
		// getCustomService(data);
	}, [dispatch]);

	const getCustomService = (data) => {
		return dispatch(dispatchCustomService(data));
	};

	return (
		<div className={classes.root}>
			<div className='services-carousel flex flex-col items-center py-5 '>
				<h2 className='uppercase font-semibold	text-center'>Choose Serivces</h2>
				<div className='w-9/12 h-16 mt-2  align-middle'>
					<AppBar position='static' color='default'>
						<AntTabs
							value={value}
							onChange={handleChange}
							indicatorColor='secondary'
							textColor='secondary'
							variant='scrollable'
							scrollButtons='auto'
							aria-label='scrollable auto tabs'
						>
							{salon.salon.services.map((service, index) => (
								<AntTab
									label={service.service}
									{...a11yProps(index)}
									onClick={() => {
										serviceId(service._id);
										getCustomService(service.customServices.primary);
									}}
								/>
							))}
						</AntTabs>
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
