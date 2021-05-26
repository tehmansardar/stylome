import { BrowserRouter as Router } from 'react-router-dom';

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
