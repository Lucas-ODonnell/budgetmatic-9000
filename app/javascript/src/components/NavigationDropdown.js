import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { NavData } from './NavData';

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
					{NavData.map((item)=> {
						const {id, path, name} = item;
						return (
							<div className="nav-page" key={id}>
								<Link to={path} 
									onClick={()=>
									{handleOnClick(name); 
										setCurrentSection(name);}}
								>
									{name}
								</Link>
								<span>{isItemInSelection(name) && <FontAwesomeIcon icon="fas fa-check"/>}
								</span>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default NavigationDropdown;
