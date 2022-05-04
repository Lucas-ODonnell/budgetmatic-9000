import React, {useState, useContext, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)


const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(false);
	const [show, setShow] = useState(false);
	const [deleteFunction, setDeleteFunction] = useState(()=> () => {return});
	const [renderBudget, setRenderBudget] = useState(0);
	const [renderEntry, setRenderEntry] = useState(0)
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleChange = (e, setVar, Var) => {
		setVar({ ...Var, [e.target.name]: e.target.value });
	};

	const errorShow = () => {
		setShowError(true);
		setTimeout(() => {
			setShowError(false)
			}, 5000);
	}

	useEffect(() => {
		if (localStorage.Authorization !== undefined) {
			const AuthorizedToken = localStorage.getItem('Authorization')
			setAuthorizationToken(JSON.parse(AuthorizedToken))
		}
		}, [authorizationToken])

	return (
		<AppContext.Provider value={{
			authorizationToken,
			setAuthorizationToken,
			show,
			setShow,
			deleteFunction, 
			setDeleteFunction,
			FontAwesomeIcon,
			renderBudget,
			setRenderBudget,
			renderEntry,
			setRenderEntry,
			errorShow,
			errorMessage,
			setErrorMessage,
			signedIn,
			setSignedIn,
			showError,
			handleChange
		}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext);
}

