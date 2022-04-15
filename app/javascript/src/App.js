import React, {useState, useEffect, useMemo} from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context/AppContext';
import Budget from './components/Pages/Budget/Budget';
import Devise from './components/Pages/Devise/Devise';
import Analysis from './components/Pages/Analysis/Analysis';
import Profile from './components/Pages/Profile/Profile';
import DeleteConfirmation from './components/DeleteConfirmation';
import Navigation from './components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const App = () => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(false);
	const [show, setShow] = useState(false);
	const [deleteFunction, setDeleteFunction] = useState(()=> () => {return});
	const [renderKey, setRenderKey] = useState(0);

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true)
		}
	}, [authorizationToken])

	const ContextProvider = useMemo(() => ({
		authorizationToken,
		show,
		setShow,
		deleteFunction, 
		setDeleteFunction,
		setSignedIn,
		FontAwesomeIcon,
		renderKey,
		setRenderKey
	}), [
			authorizationToken,
			show,
			setShow,
			deleteFunction, 
			setDeleteFunction,
			setSignedIn,
			FontAwesomeIcon,
			renderKey,
			setRenderKey
		])


	return (
		<AppContext.Provider value={ContextProvider}>
			<div className="background-form">
				{!signedIn ?
				<Devise {...{setAuthorizationToken}}/>
				:
				<>
					<Navigation />
					<DeleteConfirmation/>
					<Routes>
						<Route exact path="/" element={<Budget />}/>
						<Route exact path="profile" element={<Profile />}/>
						<Route exact path="/analysis" element={<Analysis />}/>
					</Routes>
					</>
				}
			</div>
		</AppContext.Provider>
	)
}

export default App;
