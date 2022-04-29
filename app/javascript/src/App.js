import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context/AppContext';
import Main from './components/Pages/MainPage/Main';
import Devise from './components/Pages/Devise/Devise';
import Profile from './components/Pages/Profile/Profile';
import DeleteConfirmation from './components/DeleteConfirmation';
import Navigation from './components/Navigation';
import Error from './components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const App = () => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(false);
	const [show, setShow] = useState(false);
	const [deleteFunction, setDeleteFunction] = useState(()=> () => {return});
	const [renderBudget, setRenderBudget] = useState(0);
	const [renderEntry, setRenderEntry] = useState(0)
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true)
		}
	}, [authorizationToken])

	const handleChange = (e, setVar, Var) => {
    setVar({ ...Var, [e.target.name]: e.target.value });
  };

	const errorShow = () => {
		setShowError(true);
		setTimeout(() => {
			setShowError(false)
		}, 5000);
	}

	const ContextProvider = {
		authorizationToken,
		show,
		setShow,
		deleteFunction, 
		setDeleteFunction,
		setSignedIn,
		FontAwesomeIcon,
		renderBudget,
		setRenderBudget,
		renderEntry,
		setRenderEntry,
		errorShow,
		errorMessage,
		setErrorMessage,
		handleChange
	}

	return (
		<AppContext.Provider value={ContextProvider}>
			<div className="background-form">
				{!signedIn ?
				<Devise {...{setAuthorizationToken}}/>
				:
				<>
					<Navigation />
					<Error {...{showError}}/>
					<DeleteConfirmation/>
					<Routes>
						<Route exact path="/" element={<Main />}/>
						<Route exact path="/profile" element={<Profile />}/>
					</Routes>
					</>
				}
			</div>
		</AppContext.Provider>
	)
}

export default App;
