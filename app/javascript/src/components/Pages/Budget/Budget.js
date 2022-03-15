import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import SignOut from '../../SignOut';

const Budget = () => {
	const global = useContext(AppContext)
	return (
		<section>
			<div className="background-form">
				<div className="budget-container">
					<div className = "budget-content">
						<SignOut />
						<div className = "budget-header">
							<h1>{global.currentUser.user_budget}</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Budget;
