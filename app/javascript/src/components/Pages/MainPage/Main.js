import React, { useState, useMemo } from 'react'
import Budget from '../Budget/Budget';
import Analysis from '../Analysis/Analysis';
import BudgetContext from '../../../context/BudgetContext';

const Main = () => {
	const [budgets, setBudgets] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const currentBudget = budgets[activeTab];

	const ContextProvider = useMemo(() => ({
		currentBudget, 
		activeTab, 
		setActiveTab, 
		budgets, 
		setBudgets
	}), [currentBudget, activeTab, setActiveTab, budgets, setBudgets])
	return (
		<BudgetContext.Provider value={ContextProvider}>
			<section className="main-page">
				<Budget />
				<Analysis />
			</section>
		</BudgetContext.Provider>
	)
}

export default Main;
