import React, {useState} from 'react';
import {useGlobalContext} from '../../../context/AppContext';
import axios from 'axios';

const SignUp = ({toggleSignUp}) => {
	const { handleChange, setAuthorizationToken, setSignedIn } = useGlobalContext();
	const [newUserData, setNewUserData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { user: newUserData };
		try {
			const response = await axios.post('/signup', newUser)
			if (response.headers.authorization === undefined) {
				setNewUserData({
					email: "",
					password: ""
				});
				return;
			}
			localStorage.setItem('Authorization', JSON.stringify(response.headers.authorization));
			setAuthorizationToken(JSON.parse(localStorage.getItem('Authorization')))
			setNewUserData({
				name: "",
				email: "",
				password: "",
				password_confirmation: ""
			})
			setSignedIn(true);
		} catch (error) {
			setNewUserData({
				name: "",
				email: "",
				password: "",
				password_confirmation: ""
			})
		}
	}

	return (
		<div className="devise-content">
			<div className="devise-header">
				<h1>Sign Up</h1>
			</div>
			<form onSubmit={handleSubmit} className="devise-form">
				<div className="field">
					<label>Name </label>
					<input onChange={(e)=> handleChange(e, setNewUserData, newUserData )} type="text" name="name" value={newUserData.name}/>
				</div>
				<div className="field">
					<label>Email </label>
					<input onChange={(e)=> handleChange(e, setNewUserData, newUserData )} type="email" name="email" value={newUserData.email}/>
				</div>
				<div className="field">
					<label>Password </label>
					<input onChange={(e)=> handleChange(e, setNewUserData, newUserData )} type="password" name="password" value={newUserData.password}/>
				</div>
				<div className="field">
					<label>Password Confirmation </label>
					<input onChange={(e)=> handleChange(e, setNewUserData, newUserData )} type="password" name="password_confirmation" value={newUserData.password_confirmation}/>
				</div>
				<div className="submit-area">
					<button className="submit" type="submit">Sign Up</button>
				</div>
				<div className="toggle">
					<a href="#" onClick={toggleSignUp}>Sign In </a>
				</div>
			</form>
		</div>
	)
}

export default SignUp;
