import React from 'react';

const ProfileUpdate = ({userInfo, handleChange, handleUpdate}) => {
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
