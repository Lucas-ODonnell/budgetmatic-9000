import React from 'react';
import {Link} from 'react-router-dom';

const ErrorPage = () => {
	return (
		<section>
			<div className="error-container">
				<div className="error-content">
					<h1>404</h1>
					<p>Page not found</p>
					<Link to="/" className="error-btn">Main Page</Link>
				</div>
			</div>
		</section>
	)
}

export default ErrorPage;
