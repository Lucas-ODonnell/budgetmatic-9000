import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/AppContext';
import Main from './components/Pages/MainPage/Main';
import Devise from './components/Pages/Devise/Devise';
import Profile from './components/Pages/Profile/Profile';
import ErrorPage from './components/Pages/ErrorPage';
import DeleteConfirmation from './components/DeleteConfirmation';
import Navigation from './components/Navigation';
import Error from './components/Error';

const App = () => {
	const { 
		signedIn, 
		setSignedIn, 
		showError, 
		authorizationToken, 
		setAuthorizationToken 
	} = useGlobalContext();

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true);
		}
		}, [authorizationToken])

	return (
		<div className="background-form">
			{!signedIn ?
				<Devise />
				:
				<>
					<Navigation />
					<Error {...{showError}}/>
					<DeleteConfirmation/>
					<Routes>
						<Route path="/" element={<Main />}/>
						<Route path="profile" element={<Profile />}/>
						<Route path="*" element={<ErrorPage />} />
					</Routes>
			</>
			}
		</div>
	)
}

export default App;
