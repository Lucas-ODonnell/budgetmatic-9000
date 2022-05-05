import React from 'react'
import { BudgetProvider } from '../../../context/BudgetContext';
import Budget from '../Budget/Budget';
import Analysis from '../Analysis/Analysis';
const Main = () => {
	return (
		<BudgetProvider>
			<section className="main-page">
				<Budget />
				<Analysis />
			</section>
		</BudgetProvider>
	)
}

export default Main;
