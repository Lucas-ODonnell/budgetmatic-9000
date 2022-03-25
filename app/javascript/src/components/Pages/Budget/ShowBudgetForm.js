import React from 'react';
import CreateBudget from './CreateBudget';

const ShowBudgetForm = ({showBudgetForm, setShowBudgetForm, FontAwesomeIcon, global, setBudgetRefreshKey}) => {
	return (
		<>
			<div className = "new-budget" onClick={()=>{setShowBudgetForm(!showBudgetForm)}}>
				<div className="icon" >
					{ showBudgetForm ? <FontAwesomeIcon icon="fas fa-caret-down" /> : <FontAwesomeIcon icon="fas fa-caret-right" />}
				</div>
				<p>New Budget</p>
			</div>
			{
			showBudgetForm ? 
			<CreateBudget {...{global, setBudgetRefreshKey}}/>
			:
			<div></div>
			}
			</>
	)
}

export default ShowBudgetForm;
