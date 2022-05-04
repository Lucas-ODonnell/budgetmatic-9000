import React, { useState, useContext } from 'react';
import { useGlobalContext } from '../../../context/AppContext';
import BudgetContext from '../../../context/BudgetContext';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const CreateBudgetEntry = () => {
	const { authorizationToken, setRenderEntry, errorShow, setErrorMessage, handleChange } = useGlobalContext();
	const { currentBudget, setShowGraph } = useContext(BudgetContext);
	const [budgetEntry, setBudgetEntry] = useState({
		category: "food",
		name: "",
		price: "",
		budget_id: currentBudget.id
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: { Authorization: authorizationToken }
		}
		try {
			const response = await axios.post("/api/v1/budget_entries", budgetEntry, config)
			setBudgetEntry({
				category: "food",
				name: "",
				price: "",
				budget_id: currentBudget.id
			})
			setRenderEntry(oldKey => oldKey + 1)	
			setShowGraph(false);
		} catch (error) {
			setErrorMessage(error.response.data[0]);
			errorShow();
		}
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
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Food</label>						
								<input 
									name="category" 
									value="utilities" 
									type="radio"  
									checked={budgetEntry.category === 'utilities'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Utilities</label>
								<input 
									name="category" 
									value="housing" 
									type="radio" 
									checked={budgetEntry.category === 'housing'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)} 
									/>
								<label>Housing</label>
								<input 
									name="category" 
									value="transportation" 
									type="radio" 
									checked={budgetEntry.category === 'transportation'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Transportation</label>
								<input 
									name="category" 
									value="insurance" 
									type="radio" 
									checked={budgetEntry.category === 'insurance'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Insurance</label>
							</div>
							<div className="category-row">
								<input 
									name="category" 
									value="medical" 
									type="radio" 
									checked={budgetEntry.category === 'medical'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Medical</label>			
								<input 
									name="category" 
									value="investments" 
									type="radio"  
									checked={budgetEntry.category === 'investments'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Investments</label>
								<input 
									name="category" 
									value="personal" 
									type="radio" 
									checked={budgetEntry.category === 'personal'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)} 
									/>
								<label>Personal</label>
								<input 
									name="category" 
									value="entertainment" 
									type="radio" 
									checked={budgetEntry.category === 'entertainment'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
									/>
								<label>Entertainment</label>
								<input 
									name="category" 
									value="misc" 
									type="radio" 
									checked={budgetEntry.category === 'misc'} 
									onChange={(e)=> handleChange(e, setBudgetEntry, udgetEntry)}
									/>
								<label>Misc</label>
							</div>
						</div>
						<div className="field">
							<label>Name </label>
							<input value={budgetEntry.name} className="input" type="text" name="name"
								onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
							/>
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
								onChange={(e)=> handleChange(e, setBudgetEntry, budgetEntry)}
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
