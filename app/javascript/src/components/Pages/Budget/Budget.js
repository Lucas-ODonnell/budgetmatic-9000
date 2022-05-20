import React, { useEffect } from "react";
import axios from 'axios'
import {useGlobalContext} from "../../../context/AppContext";
import Tabs from "../Tabs/Tabs";
import TabContent from "../Tabs/TabContent";
import ShowBudgetEntryContent from "./ShowBudgetEntryContent";
import ShowBudgetForm from "./ShowBudgetForm";

const Budget = () => {
	const { 
		setSignedIn, 
		setBudgets, 
		budgets, 
		activeTab, 
		setActiveTab, 
		setShowGraph,
		authorizationToken
	} = useGlobalContext();

	const getBudget = async () => {
		const config = {
			headers: { Authorization: authorizationToken },
		};
		try {
			const response = await axios.get('/api/v1/budgets.json', config);
			setBudgets([]);
			response.data.data.forEach((object) => {
				setBudgets((budgets) => [...budgets, object]);
			});
		} catch (err) {
			console.error(err)
			setSignedIn(false);
		}
	};

	useEffect(() => {
		getBudget()
		}, [budgets.length]);

	return (
		<section>
			<div className="budget-container">
				<div className="budget-content">
					<div className="budget-nav">
						<div>
							<Tabs {...{ budgets, activeTab, setActiveTab, setShowGraph }} />
						</div>
					</div>
					<div>
						<ShowBudgetForm />
					</div>
					<div className="outlet">
						{
						budgets.map((budget, index)=> {
							return (
								<TabContent id={index} activeTab={activeTab} key={index}>
									<ShowBudgetEntryContent />
								</TabContent>
							)
						})
						}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Budget;

