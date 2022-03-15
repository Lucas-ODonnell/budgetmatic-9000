import React, {useState, useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppContext from './context/AppContext';
import PrivateRoute from './routes/PrivateRoute';
import Budget from './components/Pages/Budget/Budget';
import Devise from './components/Pages/Devise/Devise';

const App = () => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(null);

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true)
		}
	}, [authorizationToken])
	const global = {
	}

	return (
		<AppContext.Provider value={global}>
			<BrowserRouter>
				<Routes>
					<Route 
						exact path="/" 
						element={
						<PrivateRoute>
							<Budget {...{signedIn}}/>
						</PrivateRoute>
						}
						/>
					<Route exact path="/login" element={<Devise/>} />
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	)
}

export default App;
