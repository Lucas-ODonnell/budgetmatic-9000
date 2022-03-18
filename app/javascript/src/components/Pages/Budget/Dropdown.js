import React, { useState, useContext } from 'react';
import AppContext from '../../../context/AppContext';

const Dropdown = ({title, items=[], multiSelect = false}) => {
	const global = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	const toggle = () => setOpen(!open)

	const handleOnClick = (item) => {
		if (!selection.some(current => current.id === item.id)) {
			if (!multiSelect) {
				setSelection([item]);
			} else if (multiSelect) {
				setSelection([...selection, item]);
			}
		} else {
			let selectionAfterRemoval = selection;
			selectionAfterRemoval = selectionAfterRemoval.filter(
				current => current.id !== item.id
			);
			setSelection([...selectionAfterRemoval])
		}
	}

	const isItemInSelection = (item) => {
		if (selection.some(current => current.id === item.id)) {
			return true;
		}
		return false;
	}

	return (
		<div className="drop-down-wrapper">
			<div 
				tabIndex={0} 
				onKeyPress={()=> toggle(!open)} 
				onClick={()=> toggle(!open)}
			>
				<div className="drop-down-title">
					<p>{title}</p>
				</div>
			</div>
			{open && (
				<ul className="dd-list">
					{items.map(item => (
						<li className="dd-list-item" key={item.id}>
							<button type="button" onClick={()=> handleOnClick(item)}>
								<div>
									{item.value}
									{isItemInSelection(item) && <global.FontAwesomeIcon icon='fas fa-check'/>}
								</div>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Dropdown;
