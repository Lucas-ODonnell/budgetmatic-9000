import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({toggleSignUp, setAuthorizationToken}) => {
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	})

	const handleChange = (e) => {
		e.preventDefault();
		setUserData({...userData, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = { user: userData }
		axios.post('/login', user)
			.then(response => {
			console.log(response)
				if (response.headers.authorization === undefined) {
					setUserData({
						email: "",
						password: ""
					});
					return;
				}
				localStorage.setItem('currentUser', JSON.stringify(response.data.data))
				localStorage.setItem('Authorization', JSON.stringify(response.headers.authorization));
				setAuthorizationToken(JSON.parse(localStorage.getItem('Authorization')));
				setUserData({
					email: "",
					password: ""
				})
			})
			.catch(response => {
				console.log(response.response);
				setUserData({
					email: "",
					password: ""
				})
			})
	}
	return (
		<div className="devise-content">
			<div className="devise-header">
				<h1>Sign In</h1>
			</div>
			<form onSubmit={handleSubmit} className="devise-form">
				<div className="field">
					<label>Email </label>
					<input onChange={handleChange} type="email" name="email" value={userData.email}/>
				</div>
				<div className="field">
					<label>Password </label>
					<input onChange={handleChange} type="password" name="password" value={userData.password}/>
				</div>
				<div className="submit-area">
					<button className="submit" type="submit">Sign In</button>
				</div>
				<div className="toggle">
					<a href="#" onClick={toggleSignUp}>Sign Up</a>
				</div>
			</form>
		</div>
	)
}

export default SignIn;
