import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const DeleteConfirmation = () => {
	const global = useContext(AppContext);
	if(!global.show) return null;
	return (
		<div className="confirmation-container">
			<div className="confirmation-content">
				<p>Are you sure you want to delete?</p>
				<div className="confirmation-options">
					<button onClick={()=> global.setShow(false)}>Cancel</button>
					<button onClick={()=> {global.deleteFunction(); global.setShow(false)}}>Delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteConfirmation;
