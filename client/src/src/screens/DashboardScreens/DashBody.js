import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Customers from './Customers';
import Staff from './Staff';
import Settings from './Settings';
const DashBody = () => {
	return (
		<>
			<Switch>
				<Route path='/' component={Dashboard} exact />
				<Route path='/dashboard' component={Dashboard} exact />
				<Route path='/dashboard/customers' component={Customers} exact />
				<Route path='/dashboard/staff' component={Staff} exact />
				<Route path='/dashboard/settings' component={Settings} exact />
			</Switch>
		</>
	);
};

export default DashBody;
