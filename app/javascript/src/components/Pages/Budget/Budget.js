import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import SignOut from '../../SignOut';
import BudgetEntry from './BudgetEntry';
import EntriesIndex from './EntriesIndex';

const Budget = () => {
	const global = useContext(AppContext);
	const FontAwesomeIcon = global.FontAwesomeIcon;
	const [showForm, setShowForm] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [currentBudget, setCurrentBudget] = useState({});

	useEffect(()=> {
		getBudget();
	},[refreshKey])

	const getBudget = () => {
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
		axios.get('/api/v1/budgets.json', config)
			.then(response => {
			console.log(response)
				setCurrentBudget(response.data.data.attributes)
			})
			.catch(response => {
				console.log(response);
			}
		)
	}

	return (
		<section>
			<div className="background-form">
				<div className="budget-container">
					<div className = "budget-content">
						<SignOut />
						<div className = "budget-header">
							<h1>{currentBudget.name}</h1>
						</div>
						<div className = "budget-entry" onClick={()=>{setShowForm(!showForm)}}>
							<div className="icon" >
								{ showForm ? <FontAwesomeIcon icon="fas fa-caret-down" /> : <FontAwesomeIcon icon="fas fa-caret-right" />}
							</div>
							<p >New Budget Entry</p>
						</div>
						{
						showForm ? 
						<BudgetEntry {...{global, setRefreshKey}}/>
						:
						<div></div>
						}
						<EntriesIndex {...{global,refreshKey, currentBudget, FontAwesomeIcon, setRefreshKey}}/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Budget;
