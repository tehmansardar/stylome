import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	dispatchSignin,
	fetchUser,
	dispatchGetUser,
} from './redux/actions/authActions';
import { fetchSalon, dispatchGetSalon } from './redux/actions/salonActions';
import axios from 'axios';

import {
	createMuiTheme,
	ThemeProvider,
	CircularProgress,
} from '@material-ui/core';

import Header from './src/components/Header';
import Body from './src/Body';

import DashboardArea from './src/screens/DashboardScreens/index';

import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FFCD06',
		},
		secondary: {
			main: '#000',
		},
		ordinary: {
			main: '#FFF',
		},
	},
});

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 1000);
	}, []);

	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const isSalon = useSelector((state) => state.auth.isSalon);
	const { user } = auth;
	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin');
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post('/api/user/refresh_token', null);
				dispatch({ type: 'GET_TOKEN', payload: res.data.access_token });
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchSignin());
				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (token) {
			const getSalon = () => {
				return fetchSalon(token).then((res) => {
					// console.log(res);
					dispatch(dispatchGetSalon(res));
				});
			};
			getSalon();
		}
	}, [token]);

	return (
		<div className='App'>
			<Router>
				<ThemeProvider theme={theme}>
					{loading ? (
						<>
							<div className='h-96 flex justify-center items-center'>
								<CircularProgress color='primary' />
							</div>
						</>
					) : user.role === 1 ? (
						<>
							<DashboardArea />
						</>
					) : (
						<>
							<Header />
							<Body />
						</>
					)}
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
