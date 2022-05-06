import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import ProtectedRoutes from './ProtectedRoutes'
import Main from '../components/Pages/MainPage/Main';
import Devise from '../components/Pages/Devise/Devise';
import Profile from '../components/Pages/Profile/Profile';
import ErrorPage from '../components/Pages/ErrorPage';


const Router = () => {
	return (
		<Routes>
			<Route path="signin" element={<Devise />} />
			<Route path="/" element={
				<ProtectedRoutes>
					<SharedLayout />
				</ProtectedRoutes>
				} 
				>
				<Route index element={
					<Main />
				}/>
				<Route path="profile" element={
					<Profile />
				}/>
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	)
}

export default Router
