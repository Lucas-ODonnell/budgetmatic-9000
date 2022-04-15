import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const NavigationDropdown = ({setCurrentSection}) => {
	const { FontAwesomeIcon } = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	const toggle = () => setOpen(!open);

	const handleOnClick = (item) => {
		setSelection([item])
		setOpen(false);
	}

	const isItemInSelection = (item) => {
		if(selection.find(current => current === item)) {
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
					<p>{open ? <FontAwesomeIcon icon="fas fa-times" /> : <FontAwesomeIcon icon="fas fa-bars" />}</p>
				</div>
			</div>
			{open && (
				<div className="nav-pages">
					<div className="nav-page">
						<Link to="/" onClick={() => {handleOnClick("Budgets"); setCurrentSection("Budgets");}}>Budgets</Link >
						<span>{isItemInSelection("Budgets") && <FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
					<div className="nav-page">
						<Link to="/profile" onClick={() => {handleOnClick("Profile"); setCurrentSection("Profile");}}>Profile</Link>
						<span>{isItemInSelection("Profile") && <FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
					<div className="nav-page">
						<Link to="/analysis" onClick={() => {handleOnClick("Analysis"); setCurrentSection("Analysis");}}>Analysis</Link>
						<span>{isItemInSelection("Analysis") && <FontAwesomeIcon icon="fas fa-check"/>}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavigationDropdown;
