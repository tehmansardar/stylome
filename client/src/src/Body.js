import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import SearchResults from './screens/SearchResults';
import InfoSalon from './screens/InfoSalon';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ActivationEmail from './screens/ActivationEmail';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import VisitHistory from './screens/VisitHistory';
import Profile from './screens/Profile';
import OpenSalon from './screens/OpenSalon';

import { useSelector } from 'react-redux';

const Body = () => {
	const auth = useSelector((state) => state.auth);
	const { isLogged } = auth;

	return (
		<>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/signin' component={isLogged ? Home : SignIn} exact />
				<Route path='/signup' component={isLogged ? Home : SignUp} exact />
				<Route
					path='/user/activate/:activation_token'
					component={ActivationEmail}
					exact
				/>
				<Route
					path='/forgot-password'
					component={isLogged ? Home : ForgotPassword}
					exact
				/>
				<Route
					path='/user/reset-password/:token'
					component={isLogged ? Home : ResetPassword}
					exact
				/>
				<Route
					path='/visit-history'
					component={isLogged ? VisitHistory : Home}
					exact
				/>
				<Route path='/profile' component={isLogged ? Profile : Home} exact />
				<Route path='/search-results' component={SearchResults} exact />
				<Route path='/salon-info/:salonId' component={InfoSalon} exact />
				<Route path='/open-salon' component={OpenSalon} exact />
			</Switch>
		</>
	);
};

export default Body;
