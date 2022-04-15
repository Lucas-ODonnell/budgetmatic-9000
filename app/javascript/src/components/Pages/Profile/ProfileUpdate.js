import React from 'react';
import axios from 'axios';

const ProfileUpdate = ({config, currentUser, fetchProfile, setShowUpdateForm}) => {
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: ""
	})

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
	return (
		<section>
			<div className="profile-update-container">
				<div className="profile-update-content">
					<form className="profile-update-form" onSubmit={handleUpdate}>
						<div className="field">
							<label>Name </label>
							<input
								onChange={handleChange}
								value={userInfo.name}
								className="input"
								type="text"
								name="name"
								/>
						</div>
						<div className="field">
							<label>Email </label>
							<input
								onChange={handleChange}
								value={userInfo.email}
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
