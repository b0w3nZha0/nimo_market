import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './page/Landing';
import Header from './component/header/Header';
import CoinDetails from './page/CoinDetail';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`
	}
})

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<div className='App'>
					<Header />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/coin/:id' element={<CoinDetails />} />
					</Routes>
				</div>
			</ThemeProvider>

		</BrowserRouter>
	);
}

export default App;
