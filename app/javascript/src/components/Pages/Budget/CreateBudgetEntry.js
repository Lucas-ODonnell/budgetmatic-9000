import React, { useState, useContext } from 'react';
import AppContext from '../../../context/AppContext';
import BudgetContext from '../../../context/BudgetContext';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const CreateBudgetEntry = () => {
	const { authorizationToken, setRenderKey } = useContext(AppContext);
	const { currentBudget } = useContext(BudgetContext);
	const [budgetEntry, setBudgetEntry] = useState({
		category: "food",
		name: "",
		price: "",
		budget_id: currentBudget.id
	})

	const handleChange = (e) => {
		setBudgetEntry({...budgetEntry, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const config = {
			headers: { Authorization: authorizationToken }
		}
		axios.post("/api/v1/budget_entries", budgetEntry, config)
			.then(response => {
				setBudgetEntry({
					category: "food",
					name: "",
					price: "",
					budget_id: currentBudget.id
				})
				setRenderKey(oldKey => oldKey + 1)	
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
							<div className="category-row">
								<input 
									name="category" 
									value="food" 
									type="radio" 
									checked={budgetEntry.category === 'food'} 
									onChange={handleChange}
									/>
								<label>Food</label>						
								<input 
									name="category" 
									value="utilities" 
									type="radio"  
									checked={budgetEntry.category === 'utilities'} 
									onChange={handleChange}
									/>
								<label>Utilities</label>
								<input 
									name="category" 
									value="housing" 
									type="radio" 
									checked={budgetEntry.category === 'housing'} 
									onChange={handleChange} 
									/>
								<label>Housing</label>
								<input 
									name="category" 
									value="transportation" 
									type="radio" 
									checked={budgetEntry.category === 'transportation'} 
									onChange={handleChange}
									/>
								<label>Transportation</label>
								<input 
									name="category" 
									value="insurance" 
									type="radio" 
									checked={budgetEntry.category === 'insurance'} 
									onChange={handleChange}
									/>
								<label>Insurance</label>
							</div>
							<div className="category-row">
								<input 
									name="category" 
									value="medical" 
									type="radio" 
									checked={budgetEntry.category === 'medical'} 
									onChange={handleChange}
									/>
								<label>Medical</label>			
								<input 
									name="category" 
									value="investments" 
									type="radio"  
									checked={budgetEntry.category === 'investments'} 
									onChange={handleChange}
									/>
								<label>Investments</label>
								<input 
									name="category" 
									value="personal" 
									type="radio" 
									checked={budgetEntry.category === 'personal'} 
									onChange={handleChange} 
									/>
								<label>Personal</label>
								<input 
									name="category" 
									value="entertainment" 
									type="radio" 
									checked={budgetEntry.category === 'entertainment'} 
									onChange={handleChange}
									/>
								<label>Entertainment</label>
								<input 
									name="category" 
									value="misc" 
									type="radio" 
									checked={budgetEntry.category === 'misc'} 
									onChange={handleChange}
									/>
								<label>Misc</label>
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
