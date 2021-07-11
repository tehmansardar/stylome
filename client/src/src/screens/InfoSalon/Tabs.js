import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DescriptionIcon from '@material-ui/icons/Description';
import GradeIcon from '@material-ui/icons/Grade';
import HdrWeakIcon from '@material-ui/icons/HdrWeak';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Description from './Description';
import Services from './Services';
import Reviews from './Reviews';

const AntTabs = withStyles({
	root: {
		boxShadow: 'none',
		backgroundColor: '#FFFFFF',
		borderRadius: '50px',
	},
	indicator: {
		backgroundColor: '#FFCD06',
	},
})(Tabs);

const AntTab = withStyles({
	root: {
		fontWeight: 'bold',
	},
})(Tab);

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
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
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '60%',
		backgroundColor: theme.palette.background.paper,

		'@media (max-width: 660px)': {
			width: '100%',
		},
	},
}));

export default function SalonTab({ salon, salonId }) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AntTabs
				value={value}
				onChange={handleChange}
				variant='scrollable'
				scrollButtons='on'
				indicatorColor='primary'
				textColor='primary'
				aria-label='scrollable force tabs example'
			>
				<AntTab label='Reviews' icon={<GradeIcon />} {...a11yProps(0)} />
				<AntTab label='Services' icon={<HdrWeakIcon />} {...a11yProps(1)} />
				<AntTab
					label='About Salon'
					icon={<DescriptionIcon />}
					{...a11yProps(2)}
				/>
			</AntTabs>

			<TabPanel value={value} index={0}>
				<Reviews id={salonId} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Services services={salon.services} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Description salon={salon} />
			</TabPanel>
		</div>
	);
}
