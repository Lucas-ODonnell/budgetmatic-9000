import React, {useContext, useState} from 'react';

const BudgetContext = React.createContext();

export const BudgetProvider = ({children}) => {
	const [budgets, setBudgets] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [entries, setEntries] = useState([]);
	const [total, setTotal] = useState(0)
	const [showGraph, setShowGraph] = useState(false);
	const currentBudget = budgets[activeTab];
	return (
		<BudgetContext.Provider value={
			{
				budgets,
				setBudgets,
				activeTab,
				setActiveTab,
				entries, 
				setEntries,
				total, 
				setTotal,
				showGraph,
				setShowGraph,
				currentBudget
			}
			}
			>
			{children}
		</BudgetContext.Provider>
	)
}

export const useBudgetContext = () => {
	return useContext(BudgetContext);
}
