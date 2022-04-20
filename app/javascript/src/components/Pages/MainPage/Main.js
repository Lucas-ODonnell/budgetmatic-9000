import React, { useState } from 'react'
import Budget from '../Budget/Budget';
import Analysis from '../Analysis/Analysis';
import BudgetContext from '../../../context/BudgetContext';

const Main = () => {
	const [budgets, setBudgets] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [entries, setEntries] = useState([]);
	const [total, setTotal] = useState(0)
	const [showGraph, setShowGraph] = useState(false);
	const currentBudget = budgets[activeTab];
	const ContextProvider = {
		currentBudget: currentBudget, 
		activeTab: activeTab, 
		setActiveTab: setActiveTab, 
		budgets: budgets, 
		setBudgets: setBudgets,
		entries: entries,
		setEntries: setEntries,
		total: total,
		setTotal: setTotal,
		showGraph,
		setShowGraph
	}	
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
