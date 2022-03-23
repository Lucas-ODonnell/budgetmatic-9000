import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({global,setRefreshKey}) => {
	const [budget, setBudget] = useState({
		name: ""
	})

	const handleChange = (e) => {
		setBudget({...budget, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
		axios.post('/api/v1/budgets', budget, config)
			.then(response => {
				setBudget({
					name: ""
				})
				setRefreshKey(oldKey => oldKey + 1)
			})
			.catch(response=> {
				console.log(response)
			})
	}
	return (
		<section>
			<div className="budget-entry-container">
				<div className="budget-entry-content">
					<form onSubmit={handleSubmit} className="budget-entry-form">
						<div className="field">
							<label>Name </label>
							<input onChange={handleChange} value={budget.name} className="input" type="text" name="name"/>
						</div>
						<div className="budget-entry-submit">
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default BudgetForm;
