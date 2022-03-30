import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
	const global = useContext(AppContext);
	const [currentUser, setCurrentUser] = useState({})
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: ""
	})

	const config = {
		headers: { Authorization: global.authorizationToken }
	}

	useEffect(()=> {
		fetchProfile()
	}, [])

	const fetchProfile = () => {
		axios.get('/api/v1/current_user', config)
			.then(response => {
				setCurrentUser(response.data)
			})
	}

	const handleChange = (e) => {
		e.preventDefault();
		setUserInfo({...userInfo, [e.target.name]: e.target.value})
	}

	const handleUpdate = (e) => {
		e.preventDefault();
		const edited = Object.fromEntries(
			Object.entries(userInfo).filter(([key, value]) => value !== ""));
		axios.put(`/api/v1/users/${currentUser.id}`, edited, config)
			.then(response => {
				fetchProfile();
				setShowUpdateForm(false);
				setUserInfo({
					name: "",
					email: "" 
				})
			})
			.catch(response => {
				console.log(response)
			})
	}

	const handleDelete = () => {
		axios.delete(`api/v1/users/${currentUser.id}`, config)
			.then(response => {
				console.log(response);
				localStorage.removeItem('currentUser');
				localStorage.removeItem('Authorization');
				global.setSignedIn(false);
			})
			.catch(response => {
				console.log(response);
			})
	}

	return (
		<section>
			<div className="profile-container">
				<div className="profile-content">
					<div className="profile-top-row">
						<div className="profile-base-info">
							<p><span>Logged in as:</span> {currentUser.name}</p>
							<p><span>Email:</span> {currentUser.email}</p>
						</div>
						<div className="delete-profile">
							<button onClick={()=>{global.setShow(true); global.setDeleteFunction(()=>()=> handleDelete())}}>
							Delete Profile
							</button>
						</div>
					</div>
						<div className = "update-profile" onClick={()=>{setShowUpdateForm(!showUpdateForm)}}>
							<div className="icon" >
								{ showUpdateForm ? <global.FontAwesomeIcon icon="fas fa-caret-down" /> : <global.FontAwesomeIcon icon="fas fa-caret-right" />}
							</div>
							<p>Update Profile</p>
						</div>
						{ showUpdateForm ?
						<ProfileUpdate {...{handleChange, handleUpdate, userInfo}}/>
						:
						<div></div>
						}
					</div>
				</div>
		</section>
	)
}

export default Profile;
