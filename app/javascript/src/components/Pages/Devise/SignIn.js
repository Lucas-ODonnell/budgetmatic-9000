import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../../../context/AppContext';
import axios from 'axios';

const SignIn = ({toggleSignUp}) => {
	const { handleChange, setAuthorizationToken, setSignedIn } = useGlobalContext();
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = { user: userData }
		try {
			const response = await axios.post('/login', user)
			if (response.headers.authorization === undefined) {
				setUserData({
					email: "",
					password: ""
				});
				return;
			}
			localStorage.setItem('Authorization', JSON.stringify(response.headers.authorization));
			setAuthorizationToken(JSON.parse(localStorage.getItem('Authorization')));
			setUserData({
				email: "",
				password: ""
			})
			setSignedIn(true);
			navigate('/');
		} catch (error) {
			setUserData({
				email: "",
				password: ""
			})
		}
	}

	return (
		<div className="devise-content">
			<div className="devise-header">
				<h1>Sign In</h1>
			</div>
			<form onSubmit={handleSubmit} className="devise-form">
				<div className="field">
					<label>Email </label>
					<input onChange={(e)=> handleChange(e, setUserData, userData)} type="email" name="email" value={userData.email}/>
				</div>
				<div className="field">
					<label>Password </label>
					<input onChange={(e)=> handleChange(e, setUserData, userData)} type="password" name="password" value={userData.password}/>
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
