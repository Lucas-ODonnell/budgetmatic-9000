import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import SignOut from '../../SignOut';
import Tabs from '../Tabs/Tabs';
import TabContent from '../Tabs/TabContent';
import ShowCurrentBudget from './ShowCurrentBudget';
import NewBudgetForm from './NewBudgetForm';

const Budget = () => {
	const global = useContext(AppContext);
	const FontAwesomeIcon = global.FontAwesomeIcon;
	const [showBudgetEntry, setShowBudgetEntry] = useState(false);
	const [showBudgetForm, setShowBudgetForm] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [currentBudget, setCurrentBudget] = useState({});
	const [activeTab, setActiveTab] = useState("tab1");

	useEffect(()=> {
		getBudget();
	},[refreshKey])

	const getBudget = () => {
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
		axios.get('/api/v1/budgets.json', config)
			.then(response => {
				console.log(response)
				setCurrentBudget(response.data.data.attributes)
			})
			.catch(response => {
				console.log(response);
			}
		)
	}
	return (
		<section>
			<div className="background-form">
				<div className="budget-container">
					<div className = "budget-content">
						<div className="budget-nav">
							<div>
								<Tabs {...{activeTab, setActiveTab}}/>
							</div>
							<div>
								<NewBudgetForm {...{showBudgetForm, setShowBudgetForm, FontAwesomeIcon, global, setRefreshKey}}/>
															</div>
							<div>
								<SignOut />
							</div>
						</div>
						<div className="outlet">
							<TabContent id="tab1" activeTab={activeTab}>
								<ShowCurrentBudget {...{currentBudget, showBudgetEntry, setShowBudgetEntry, global, FontAwesomeIcon, setRefreshKey, refreshKey}}/>
							</TabContent>
							<TabContent id="tab2" activeTab={activeTab}>
								<p>Tab 2 works!</p>
							</TabContent>
							<TabContent id="tab3" activeTab={activeTab}>
								<p>Tab 3 works!</p>
							</TabContent>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Budget;
