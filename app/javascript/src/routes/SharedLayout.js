import React from 'react'
import Navigation from '../components/Navigation';
import {Outlet} from 'react-router-dom'

const SharedLayout = () => {
	return (
	<>
			<Navigation/>
			<Outlet />
			</>
	)
}

export default SharedLayout;
