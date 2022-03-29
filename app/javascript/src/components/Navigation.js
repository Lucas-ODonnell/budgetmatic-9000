import React, { useState } from 'react';
import NavigationDropdown from './NavigationDropdown';
import SignOut from './SignOut';

const Navigation = () => {
	const [currentSection, setCurrentSection] = useState("Budgets");
	return (
		<div className="nav-container">
			<div className="nav-content">
				<div className="nav-left"  >
					<NavigationDropdown {...{setCurrentSection}} />
				</div>
				<div className="nav-center">
					<h1>{currentSection}</h1>
				</div>
				<div className="nav-right">
					<SignOut />
				</div>
			</div>
		</div>
	)
}

export default Navigation;
