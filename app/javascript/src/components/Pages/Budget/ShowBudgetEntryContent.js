import React from 'react'
import CreateBudgetEntry from './CreateBudgetEntry';
import EntriesIndex from './EntriesIndex';

const ShowBudgetEntryContent = ({budget, showBudgetEntry, setShowBudgetEntry, global, FontAwesomeIcon, setEntryRefreshKey, entryRefreshKey, setFilterRefreshKey, filterRefreshKey}) => {
	return (
			<>
				<div className = "budget-header">
					<h1>{budget.attributes.name}</h1>
				</div>
				<div className = "budget-entry" onClick={()=>{setShowBudgetEntry(!showBudgetEntry)}}>
					<div className="icon" >
						{ showBudgetEntry ? <FontAwesomeIcon icon="fas fa-caret-down" /> : <FontAwesomeIcon icon="fas fa-caret-right" />}
					</div>
					<p >New Budget Entry</p>
				</div>
				{
				showBudgetEntry ? 
				<CreateBudgetEntry {...{budget,global, setEntryRefreshKey}}/>
				:
				<div></div>
				}
				<EntriesIndex {...{budget,global, budget, FontAwesomeIcon, setEntryRefreshKey, entryRefreshKey, setFilterRefreshKey, filterRefreshKey}}/>
				</>
		)
}

export default ShowBudgetEntryContent;
