import React, { useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

const SignOut = () => {
	const global = useContext(AppContext);
	const config = {
		headers: { Authorization: global.authorizationToken }
	}

	const handleSignOut = (e) => {
		e.preventDefault();
		axios.delete('/logout', config)
			.then(response =>{
				console.log(response)
				global.setSignedIn(false);
				localStorage.clear()
			})
			.catch(response => {
				console.log(response);
				global.setSignedIn(false);
				localStorage.clear();
			})
	}

	return (
		<div className="budget-signout">
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	)
}

export default SignOut;
