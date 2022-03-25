import React, { useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const CreateBudgetEntry = ({budget,global,setEntryRefreshKey}) => {
	const [budgetEntry, setBudgetEntry] = useState({
		category: "food",
		name: "",
		price: "",
		id: budget.id
	})

	const handleChange = (e) => {
		setBudgetEntry({...budgetEntry, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
		axios.post("/api/v1/budget_entries", budgetEntry, config)
			.then(response => {
				setBudgetEntry({
					category: "food",
					name: "",
					price: "",
					id: budget.id
				})
				setEntryRefreshKey(oldKey => oldKey + 1)
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
							<label>Category </label>
							<div className="category-row-1">
								<input 
									name="category" 
									value="food" 
									type="radio" 
									checked={budgetEntry.category === 'food'} 
									onChange={handleChange}
									/>Food							
								<input 
									name="category" 
									value="utilities" 
									type="radio"  
									checked={budgetEntry.category === 'utilities'} 
									onChange={handleChange}
									/>Utilities
								<input 
									name="category" 
									value="housing" 
									type="radio" 
									checked={budgetEntry.category === 'housing'} 
									onChange={handleChange} 
									/>Housing
								<input 
									name="category" 
									value="transportation" 
									type="radio" 
									checked={budgetEntry.category === 'transportation'} 
									onChange={handleChange}
									/>Transportation
								<input 
									name="category" 
									value="insurance" 
									type="radio" 
									checked={budgetEntry.category === 'insurance'} 
									onChange={handleChange}
									/>Insurance
							</div>
							<div>
								<input 
									name="category" 
									value="medical" 
									type="radio" 
									checked={budgetEntry.category === 'medical'} 
									onChange={handleChange}
									/>Medical						
								<input 
									name="category" 
									value="investments" 
									type="radio"  
									checked={budgetEntry.category === 'investments'} 
									onChange={handleChange}
									/>Investments
								<input 
									name="category" 
									value="personal" 
									type="radio" 
									checked={budgetEntry.category === 'personal'} 
									onChange={handleChange} 
									/>Personal
								<input 
									name="category" 
									value="entertainment" 
									type="radio" 
									checked={budgetEntry.category === 'entertainment'} 
									onChange={handleChange}
									/>Entertainment
								<input 
									name="category" 
									value="misc" 
									type="radio" 
									checked={budgetEntry.category === 'misc'} 
									onChange={handleChange}
									/>Misc
							</div>
						</div>
						<div className="field">
							<label>Name </label>
							<input onChange={handleChange} value={budgetEntry.name} className="input" type="text" name="name"/>
						</div>
						<div className="field">
							<label>Price </label>
							<NumberFormat
								className="input"
								name="price"
								value={budgetEntry.price}
								thousandSeparator={true}
								decimalScale={2}
								prefix={'$'}
								onChange={handleChange}
								/>
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

export default CreateBudgetEntry;
