import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Devise = ({setAuthorizationToken}) => {
	const [ signUp, setSignUp ] = useState(false);
	const toggleSignUp = (e) => {
		e.preventDefault();
		setSignUp(!signUp)
	}
	return (
		<section>
			<div className="background-form">
				<div className="devise-container">
					{
					signUp ?
					<SignUp {...{toggleSignUp, setAuthorizationToken}} />
					:
					<SignIn {...{toggleSignUp, setAuthorizationToken}} />
					}
				</div>
			</div>
		</section>
	)
}

export default Devise;
