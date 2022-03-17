import React, {useState, useEffect} from 'react';
import AppContext from './context/AppContext';
import Budget from './components/Pages/Budget/Budget';
import Devise from './components/Pages/Devise/Devise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const App = () => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			const CurrentUser = localStorage.getItem('currentUser')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
			setCurrentUser(JSON.parse(CurrentUser))
			setSignedIn(true)
		}
	}, [authorizationToken])
	const global = {
		currentUser: currentUser,
		authorizationToken: authorizationToken,
		setSignedIn: setSignedIn,
		signedIn: signedIn,
		FontAwesomeIcon: FontAwesomeIcon
	}

	return (
		<AppContext.Provider value={global}>
			{!signedIn ?
			<Devise {...{setAuthorizationToken, setCurrentUser}}/>
			:
			<Budget />
			}
		</AppContext.Provider>
	)
}

export default App;
