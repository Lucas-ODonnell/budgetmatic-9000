import React from 'react';
import { useGlobalContext } from '../context/AppContext';

const Error = ({showError}) => {
	const { errorMessage } = useGlobalContext();
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
