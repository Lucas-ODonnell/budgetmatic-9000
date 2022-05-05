import React, {useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)


const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [authorizationToken, setAuthorizationToken] = useState();
	const [signedIn, setSignedIn] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [deleteFunction, setDeleteFunction] = useState(()=> () => {return});
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [renderBudget, setRenderBudget] = useState(0);
	const [renderEntry, setRenderEntry] = useState(0);

	const handleChange = (e, setVar, Var) => {
		setVar({ ...Var, [e.target.name]: e.target.value });
	};

	const errorShow = () => {
		setShowError(true);
		setTimeout(() => {
			setShowError(false)
			}, 5000);
	}

	return (
		<AppContext.Provider value={{
			authorizationToken,
			setAuthorizationToken,
			showWarning,
			setShowWarning,
			deleteFunction, 
			setDeleteFunction,
			FontAwesomeIcon,
			errorShow,
			errorMessage,
			setErrorMessage,
			signedIn,
			setSignedIn,
			showError,
			handleChange,
			renderBudget,
			setRenderBudget,
			renderEntry,
			setRenderEntry
		}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext);
}

