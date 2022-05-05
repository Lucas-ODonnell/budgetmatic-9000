import React from 'react';
import { useGlobalContext } from '../context/AppContext';

const DeleteConfirmation = () => {
	const { showWarning, setShowWarning, deleteFunction } = useGlobalContext();
	if(!showWarning) return null;
	return (
		<div className="confirmation-container">
			<div className="confirmation-content">
				<p>Are you sure you want to delete?</p>
				<div className="confirmation-options">
					<button onClick={()=> setShowWarning(false)}>Cancel</button>
					<button onClick={()=> {deleteFunction(); setShowWarning(false)}}>Delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteConfirmation;
