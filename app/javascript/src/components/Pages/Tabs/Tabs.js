import React from "react";
import TabNavItem from "./TabNavItem";
const Tabs = ({activeTab, setActiveTab}) => {
	return (
		<div className="tabs">
			<ul className="tab-nav">
				<TabNavItem title="Tab 1" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
				<TabNavItem title="Tab 2" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
				<TabNavItem title="Tab 3" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
			</ul>
		</div>
	);
};

export default Tabs;

