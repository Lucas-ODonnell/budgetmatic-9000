import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Error = ({showError}) => {
	const { errorMessage } = useContext(AppContext);
	if (!showError) {
		return (
			<>
				</>
		)
	};
	return (
		<div className="error">
			<p>{errorMessage}</p>
		</div>
	)
}

export default Error;
