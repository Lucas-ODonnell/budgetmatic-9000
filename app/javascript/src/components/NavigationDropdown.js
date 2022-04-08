import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const NavigationDropdown = ({setCurrentSection}) => {
	const global = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	const toggle = () => setOpen(!open);

	const handleOnClick = (item) => {
			setSelection([item])
			setOpen(false);
	}

	const isItemInSelection = (item) => {
		if(selection.find(current => current === item)) {
			setCurrentSection(item)
			return true;
		}
		return false;
	}

	return (
		<div>
			<div
				tabIndex={0}
				className="dd-header"
				role="button"
				onKeyPress={() => toggle(!open)}
				onClick={() =>{toggle(!open)}}
			>
				<div>
					<p>{open ? <global.FontAwesomeIcon icon="fas fa-times" /> : <global.FontAwesomeIcon icon="fas fa-bars" />}</p>
				</div>
			</div>
			{open && (
				<div className="nav-pages">
					<div className="nav-page">
						<Link to="/" onClick={() => handleOnClick("Budgets")}>Budgets</Link >
						<span>{isItemInSelection("Budgets") && <global.FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
					<div className="nav-page">
						<Link to="/profile" onClick={() => handleOnClick("Profile")}>Profile</Link>
						<span>{isItemInSelection("Profile") && <global.FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
					<div className="nav-page">
						<Link to="/analysis" onClick={() => handleOnClick("Analysis")}>Analysis</Link>
						<span>{isItemInSelection("Analysis") && <global.FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavigationDropdown;
