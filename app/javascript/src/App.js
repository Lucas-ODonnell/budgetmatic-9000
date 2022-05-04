import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/AppContext';
import Main from './components/Pages/MainPage/Main';
import Devise from './components/Pages/Devise/Devise';
import Profile from './components/Pages/Profile/Profile';
import DeleteConfirmation from './components/DeleteConfirmation';
import Navigation from './components/Navigation';
import Error from './components/Error';

const App = () => {
	const { signedIn, showError } = useGlobalContext();
	return (
			<div className="background-form">
				{!signedIn ?
					<Devise />
					:
					<>
						<Navigation />
						<Error {...{showError}}/>
						<DeleteConfirmation/>
						<Routes>
							<Route exact path="/" element={<Main />}/>
							<Route exact path="/profile" element={<Profile />}/>
						</Routes>
				</>
				}
			</div>
	)
}

export default App;
