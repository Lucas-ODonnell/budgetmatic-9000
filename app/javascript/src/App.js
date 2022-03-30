import React, {useState, useEffect} from 'react';
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
	const [currentUser, setCurrentUser] = useState({})
	const [show, setShow] = useState(false);
	const [deleteFunction, setDeleteFunction] = useState(()=> () => {return});

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			const CurrentUser = localStorage.getItem('currentUser')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setSignedIn(true)
		}
	}, [authorizationToken])

	const global = {
		authorizationToken: authorizationToken,
		setSignedIn: setSignedIn,
		signedIn: signedIn,
		FontAwesomeIcon: FontAwesomeIcon,
		show: show,
		setShow: setShow,
		deleteFunction: deleteFunction,
		setDeleteFunction: setDeleteFunction
	}

	return (
		<AppContext.Provider value={global}>
			<div className="background-form">
				{!signedIn ?
				<Devise {...{setAuthorizationToken, setCurrentUser}}/>
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
