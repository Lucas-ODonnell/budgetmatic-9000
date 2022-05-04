import React from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/AppContext';

const SignOut = () => {
	const { setSignedIn, authorizationToken} = useGlobalContext();
	const config = {
		headers: { Authorization: authorizationToken }
	}

	const handleSignOut = (e) => {
		e.preventDefault();
		axios.delete('/logout', config)
			.then(response =>{
				console.log(response)
				setSignedIn(false);
			})
			.catch(response => {
				console.log(response);
				setSignedIn(false);
			})
	}

	return (
		<div className="budget-signout">
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	)
}

export default SignOut;
