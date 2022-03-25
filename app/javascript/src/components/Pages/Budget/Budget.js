import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import SignOut from '../../SignOut';
import Tabs from '../Tabs/Tabs';
import TabContent from '../Tabs/TabContent';
import ShowBudgetEntryContent from './ShowBudgetEntryContent';
import ShowBudgetForm from './ShowBudgetForm';

const Budget = () => {
	const global = useContext(AppContext);
	const FontAwesomeIcon = global.FontAwesomeIcon;
	const [showBudgetEntry, setShowBudgetEntry] = useState(false);
	const [showBudgetForm, setShowBudgetForm] = useState(false);
	const [filterRefreshKey, setFilterRefreshKey] = useState(0);
	const [entryRefreshKey, setEntryRefreshKey] = useState(0);
	const [budgetRefreshKey, setBudgetRefreshKey] = useState(0);
	const [budgets, setBudgets] = useState([]);
	const [activeTab, setActiveTab] = useState(0);

	useEffect(()=> {
		getBudget();
	},[budgetRefreshKey])

	const getBudget = () => {
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
		axios.get('/api/v1/budgets.json', config)
			.then(response => {
			response.data.data.forEach(object => setBudgets(budgets => [...budgets, object]))
			})
			.catch(response => {
				console.log(response);
			}
		)
	}
	const allBudgets = budgets.map((budget, index) => {
		return (
			<TabContent id={index} activeTab={activeTab} key={index}>
				<ShowBudgetEntryContent {...{budget, showBudgetEntry, setShowBudgetEntry, global, FontAwesomeIcon, setEntryRefreshKey, entryRefreshKey, filterRefreshKey, setFilterRefreshKey}}/>
			</TabContent>
		)
	})
	return (
		<section>
			<div className="background-form">
				<div className="budget-container">
					<div className = "budget-content">
						<div className="budget-nav">
							<div>
								<Tabs {...{budgets, activeTab, setActiveTab}}/>
							</div>
							<div>
								<ShowBudgetForm {...{showBudgetForm, setShowBudgetForm, FontAwesomeIcon, global,setBudgetRefreshKey}}/>
															</div>
							<div>
								<SignOut />
							</div>
						</div>
						<div className="outlet">
						{allBudgets}
													</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Budget;
