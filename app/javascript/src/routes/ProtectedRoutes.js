import React from 'react';
import { Navigate } from 'react-router-dom';
import {useGlobalContext} from '../context/AppContext';

const ProtectedRoutes = ({children}) => {
	const {signedIn} = useGlobalContext();
		if (!signedIn) {
			return <Navigate to="signin" />
		}
		return children;
}

export default ProtectedRoutes;
