import React, { useState } from 'react';
import {useGlobalContext} from '../../../context/AppContext';
import axios from 'axios';

const ProfileUpdate = ({config, currentUser, fetchProfile, setShowUpdateForm}) => {
	const { setErrorMessage, errorShow } = useGlobalContext();
	const [userInfo, setUserInfo] = useState({ user: 
		{
			name: "",
			email: ""
		}
	}
	)

	const handleChange = (e) => {
		e.preventDefault();
		setUserInfo({...userInfo, 
			user: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleUpdate = async (e) => {
		e.preventDefault();
		const edited = Object.fromEntries(
			Object.entries(userInfo).filter(([key, value]) => value !== ""));
		try {
			const response = await axios.put(`/api/v1/users/${currentUser.id}`, edited, config)
			fetchProfile();
			setShowUpdateForm(false);
			setUserInfo({
				name: "",
				email: "" 
			})
		} catch (error) {
			setErrorMessage(error.response.data[1])
			errorShow();
		}
	}
	return (
		<section>
			<div className="profile-update-container">
				<div className="profile-update-content">
					<form className="profile-update-form" onSubmit={handleUpdate}>
						<div className="field">
							<label>Name </label>
							<input
								onChange={handleChange}
								value={userInfo.user.name}
								className="input"
								type="text"
								name="name"
								/>
						</div>
						<div className="field">
							<label>Email </label>
							<input
								onChange={handleChange}
								value={userInfo.user.email}
								className="input"
								type="email"
								name="email"
								/>
						</div>
						<div className="profile-update-submit">
							<button className="submit" type="submit">Update</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default ProfileUpdate;
