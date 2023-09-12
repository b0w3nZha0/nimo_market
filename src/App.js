import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './component/page/Landing';
import Header from './component/header/Header';
import CoinDetails from './component/page/CoinDetail';
import { makeStyles } from '@mui/material';
import { color, minHeight } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/coin/:id' element={<CoinDetails />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
