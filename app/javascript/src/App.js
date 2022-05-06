import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/AppContext';
import Router from './routes/Router';
import DeleteConfirmation from './components/DeleteConfirmation';
import Error from './components/Error';

const App = () => {
	const { 
		setSignedIn, 
		showError, 
		authorizationToken, 
		setAuthorizationToken 
	} = useGlobalContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.Authorization !== null) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true);
			navigate("/");
		}
		}, [authorizationToken])

	return (
		<div className="background-form">
			<Error {...{showError}}/>
			<DeleteConfirmation/>
			<Router />
		</div>
	)
}

export default App;
