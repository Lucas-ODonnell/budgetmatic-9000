import React, { useState } from 'react'
import axios from 'axios';
import CreateBudgetEntry from './CreateBudgetEntry';
import EntriesIndex from './EntriesIndex';
import NumberFormat from 'react-number-format';


const ShowBudgetEntryContent = ({budget, showBudgetEntry, setShowBudgetEntry, global, FontAwesomeIcon, setEntryRefreshKey, entryRefreshKey, setFilterRefreshKey, filterRefreshKey, setBudgetRefreshKey}) => {
	const [editBudget, setEditBudget] = useState(false);
	const [update, setUpdate] = useState({
		name: `${budget.attributes.name}`,
		monthly_budget: `${budget.attributes.monthly_budget}`
	})
	const config = {
		headers: { Authorization: global.authorizationToken }
	}

	const handleBudgetDelete = () => {
		axios.delete(`/api/v1/budgets/${budget.id}`, config)
			.then(response => {
				setBudgetRefreshKey(oldkey => oldkey + 1)
			})
			.catch(response => {
				console.log(response)
			})
	}

	const handleChange = (e) => {
		setUpdate({...update, [e.target.name]: e.target.value});
	}

	const handleBudgetUpdate = (e) => {
		e.preventDefault();
		axios.put(`/api/v1/budgets/${budget.id}`, update, config)
			.then(response => {
				setBudgetRefreshKey(oldkey => oldkey + 1)
				setUpdate({
					name: `${budget.attributes.name}`,
					monthly_budget: `${budget.attributes.monthly_budget}`

				})
			})
			.catch(response => {
				console.log(response)
			})
	}

	return (
		<>
			<div className = "budget-header">
				{!editBudget ?
				<>
					<h1 onClick={()=>{setEditBudget(true)}}>{budget.attributes.name}</h1>
					<div className="budget-options">
						<button onClick={()=>{global.setShow(true); global.setDeleteFunction(()=>()=> handleBudgetDelete())}}><FontAwesomeIcon icon="fas fa-times"/></button>
					</div>
					</>
				:
				<form onSubmit={(e)=>{handleBudgetUpdate(e); setEditBudget(false);}}className="budget-entry-form update-form">
					<div className="field">
						<label>Update Name </label>
					<input className="input" name="name" value={update.name} onChange={handleChange}/>
					</div>
					<div className="field">
						<label>Update Monthly Income </label>
					<NumberFormat
						className="input"
						name="monthly_budget"
						value={update.monthly_budget}
						thousandSeparator={true}
						decimalScale={2}
						prefix={'$'}
						onChange={handleChange}
						/>
						</div>
					<button onClick={()=>setEditBudget(false)}>Cancel</button>
					<button className="update" type="submit">Update</button>
				</form>
				}
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
