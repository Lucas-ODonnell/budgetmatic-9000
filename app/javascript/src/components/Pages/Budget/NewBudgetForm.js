import React from 'react';
import BudgetForm from './BudgetForm';

const NewBudgetForm = ({showBudgetForm, setShowBudgetForm, FontAwesomeIcon, global, setRefreshKey}) => {
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
			<BudgetForm {...{global, setRefreshKey}}/>
			:
			<div></div>
			}
			</>
	)
}

export default NewBudgetForm;
