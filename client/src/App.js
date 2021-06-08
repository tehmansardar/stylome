import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	dispatchSignin,
	fetchUser,
	dispatchGetUser,
} from './redux/actions/authActions';
import axios from 'axios';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Header from './src/components/Header';
import Body from './src/Body';
import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FFCD06',
		},
		secondary: {
			main: '#000',
		},
	},
});

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);

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

	return (
		<div className='App'>
			<Router>
				<ThemeProvider theme={theme}>
					<Header />
					<Body />
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
