import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import YouTubeIcon from '@material-ui/icons/YouTube';

import { Link } from 'react-router-dom';

export const mainListItems = (
	<div>
		<Link to='/dashboard'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
		</Link>
		<Link to='/dashboard/customers'>
			<ListItem button>
				<ListItemIcon>
					<AirlineSeatReclineNormalIcon />
				</ListItemIcon>
				<ListItemText primary='Customers' />
			</ListItem>
		</Link>
		<Link to='/dashboard/staff'>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='Staff' />
			</ListItem>
		</Link>
		<Link to='/dashboard/settings'>
			<ListItem button>
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
				<ListItemText primary='Settings' />
			</ListItem>
		</Link>
		<ListItem button>
			<ListItemIcon>
				<PowerSettingsNewIcon />
			</ListItemIcon>
			<ListItemText primary='Sign out' />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon style={{ color: '#FF0000' }}>
				<YouTubeIcon />
			</ListItemIcon>
			<ListItemText style={{ color: '#FF0000' }} primary='How to use?' />
		</ListItem>
	</div>
);
