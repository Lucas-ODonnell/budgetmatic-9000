import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../context/AppContext';
import ProfileUpdate from './ProfileUpdate';
import axios from 'axios';

const Profile = () => {
	const { FontAwesomeIcon, authorizationToken, setSignedIn, setShow, setDeleteFunction } = useContext(AppContext);
	const [currentUser, setCurrentUser] = useState({})
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	
	const config = {
		headers: { Authorization: authorizationToken }
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

	const handleDelete = () => {
		axios.delete(`api/v1/users/${currentUser.id}`, config)
			.then(response => {
				console.log(response);
				localStorage.removeItem('currentUser');
				localStorage.removeItem('Authorization');
				setSignedIn(false);
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
							<button onClick={()=>{setShow(true); setDeleteFunction(()=>()=> handleDelete())}}>
							Delete Profile
							</button>
						</div>
					</div>
						<div className = "update-profile" onClick={()=>{setShowUpdateForm(!showUpdateForm)}}>
							<div className="icon" >
								{ showUpdateForm ? <FontAwesomeIcon icon="fas fa-caret-down" /> : <FontAwesomeIcon icon="fas fa-caret-right" />}
							</div>
							<p>Update Profile</p>
						</div>
						{ showUpdateForm ?
						<ProfileUpdate {...{config, currentUser, fetchProfile, setShowUpdateForm}}/>
						:
						<div></div>
						}
					</div>
				</div>
		</section>
	)
}

export default Profile;