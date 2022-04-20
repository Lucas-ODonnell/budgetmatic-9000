import React, { useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../context/AppContext";
import BudgetContext from "../../../context/BudgetContext";
import Tabs from "../Tabs/Tabs";
import TabContent from "../Tabs/TabContent";
import ShowBudgetEntryContent from "./ShowBudgetEntryContent";
import ShowBudgetForm from "./ShowBudgetForm";

const Budget = () => {
	const { authorizationToken, renderBudget, setSignedIn } = useContext(AppContext);
	const { setBudgets, budgets, activeTab, setActiveTab, setShowGraph } = useContext(BudgetContext);

	useEffect(() => {
		getBudget();
	}, [renderBudget]);

	const getBudget = async () => {
		const config = {
			headers: { Authorization: authorizationToken },
		};
		try {
			const response = await axios.get("/api/v1/budgets.json", config)
			setBudgets([]);
			response.data.data.forEach((object) => {
				setBudgets((budgets) => [...budgets, object]);
			});
		} catch (err) {
			console.error(err)
			setSignedIn(false);
		}
	};

	const allBudgets = budgets.map((budget, index) => {
		return (
			<TabContent id={index} activeTab={activeTab} key={index}>
				<ShowBudgetEntryContent />
			</TabContent>
		);
	});
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
					<div className="outlet">{allBudgets}</div>
				</div>
			</div>
		</section>
	);
};

export default Budget;

