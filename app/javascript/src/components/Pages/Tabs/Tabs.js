import React from "react";
import TabNavItem from "./TabNavItem";
const Tabs = ({budgets, activeTab, setActiveTab, setShowGraph}) => {
	const setTabs = budgets.map((budget, index) => {
		const { name } = budget.attributes;
		return (
			<TabNavItem title={name} id={index} key={index} activeTab={activeTab} setActiveTab={setActiveTab}/>
		)
	})
	return (
		<div className="tabs">
			<ul className="tab-nav" onClick={() => setShowGraph(false)}>
				{setTabs}
			</ul>
		</div>
	);
};

export default Tabs;

