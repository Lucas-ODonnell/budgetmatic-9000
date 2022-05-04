import React from 'react';
import { useGlobalContext } from '../context/AppContext';

const DeleteConfirmation = () => {
	const { show, setShow, deleteFunction } = useGlobalContext();
	if(!show) return null;
	return (
		<div className="confirmation-container">
			<div className="confirmation-content">
				<p>Are you sure you want to delete?</p>
				<div className="confirmation-options">
					<button onClick={()=> setShow(false)}>Cancel</button>
					<button onClick={()=> {deleteFunction(); setShow(false)}}>Delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteConfirmation;
