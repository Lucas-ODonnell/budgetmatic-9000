import React from 'react'
import BudgetEntry from './BudgetEntry';
import EntriesIndex from './EntriesIndex';

const ShowCurrentBudget = ({currentBudget, showBudgetEntry, setShowBudgetEntry, global, FontAwesomeIcon, setRefreshKey, refreshKey}) => {
	return (
			<>
				<div className = "budget-header">
					<h1>{currentBudget.name}</h1>
				</div>
				<div className = "budget-entry" onClick={()=>{setShowBudgetEntry(!showBudgetEntry)}}>
					<div className="icon" >
						{ showBudgetEntry ? <FontAwesomeIcon icon="fas fa-caret-down" /> : <FontAwesomeIcon icon="fas fa-caret-right" />}
					</div>
					<p >New Budget Entry</p>
				</div>
				{
				showBudgetEntry ? 
				<BudgetEntry {...{global, setRefreshKey}}/>
				:
				<div></div>
				}
				<EntriesIndex {...{global,refreshKey, currentBudget, FontAwesomeIcon, setRefreshKey}}/>
				</>
		)
}

export default ShowCurrentBudget;
