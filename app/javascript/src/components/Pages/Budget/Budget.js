import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import BudgetContext from '../../../context/BudgetContext';
import Tabs from '../Tabs/Tabs';
import TabContent from '../Tabs/TabContent';
import ShowBudgetEntryContent from './ShowBudgetEntryContent';
import ShowBudgetForm from './ShowBudgetForm';

const Budget = () => {
	const { authorizationToken, renderKey } = useContext(AppContext);
	const [budgets, setBudgets] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const currentBudget = budgets[activeTab];

	useEffect(()=> {
		getBudget();
	},[renderKey])
	const getBudget = () => {
		const config = {
		headers: { Authorization: authorizationToken }
	}
		axios.get('/api/v1/budgets.json', config)
			.then(response => {
				setBudgets([])
				response.data.data.forEach(object => setBudgets(budgets => [...budgets, object]))
			})
			.catch(response => {
				console.log(response);
			}
			)
	}

	const ContextProvider = useMemo(() => ({currentBudget}), [currentBudget])

	const allBudgets = budgets.map((budget, index) => {
		return (
			<TabContent id={index} activeTab={activeTab} key={index}>
				<ShowBudgetEntryContent />
			</TabContent>
		)
	})
	return (
		<BudgetContext.Provider value={ContextProvider}>
		<section>
				<div className="budget-container">
					<div className = "budget-content">
						<div className="budget-nav">
							<div>
								<Tabs {...{budgets, activeTab, setActiveTab}}/>
							</div>
						</div>
						<div>
							<ShowBudgetForm />
						</div>
						<div className="outlet">
							{allBudgets}
						</div>
					</div>
				</div>
		</section>
		</BudgetContext.Provider>
	)
}

export default Budget;
