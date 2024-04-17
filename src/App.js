import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Random from './page/random/Random';
import './App.css';

function App() {
	return (
		<Routes>
			<Route path='/'>
				<Route path='random' element={<Random />} />
			</Route>
		</Routes>
	);
}

export default App;
