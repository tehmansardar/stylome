import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import SearchResults from './screens/SearchResults';
import InfoSalon from './screens/InfoSalon';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import VisitHistory from './screens/VisitHistory';
import Profile from './screens/Profile';
import OpenSalon from './screens/OpenSalon';
const Body = () => {
	return (
		<>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/signin' component={SignIn} exact />
				<Route path='/signup' component={SignUp} exact />
				<Route path='/forgot-password' component={ForgotPassword} exact />
				<Route path='/reset-password' component={ResetPassword} exact />
				<Route path='/visit-history' component={VisitHistory} exact />
				<Route path='/profile' component={Profile} exact />
				<Route path='/search-results' component={SearchResults} exact />
				<Route path='/salon-info/:salonId' component={InfoSalon} exact />
				<Route path='/open-salon' component={OpenSalon} exact />
			</Switch>
		</>
	);
};

export default Body;
