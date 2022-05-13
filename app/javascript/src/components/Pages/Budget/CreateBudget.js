import React, { useState } from "react";
import { useGlobalContext } from "../../../context/AppContext";
import axios from "axios";
import NumberFormat from "react-number-format";

const CreateBudget = () => {
	const { 
		authorizationToken, 
		setErrorMessage, 
		errorShow, 
		handleChange, 
		setShowGraph,
		setBudgets,
		budgets
	} = useGlobalContext();

	const [budget, setBudget] = useState({
		name: "",
		monthly_budget: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: { Authorization: authorizationToken },
		};
		try {
			const response = await axios.post("/api/v1/budgets", budget, config)
			setBudgets([...budgets, response.data.data])
			setBudget({
				name: "",
				monthly_budget: "",
			});
			setShowGraph(false);
		} catch (error) {
			setErrorMessage(error.response.data[0]);
			errorShow();
		}
	};
	return (
		<section>
			<div className="budget-entry-container">
				<div className="budget-entry-content">
					<form onSubmit={handleSubmit} className="budget-entry-form">
						<div className="field">
							<label>Name </label>
							<input
								onChange={(e)=>handleChange(e,setBudget, budget)}
								value={budget.name}
								className="input"
								type="text"
								name="name"
							/>
						</div>
						<div className="field">
							<label>Monthly Income </label>
							<NumberFormat
								className="input"
								name="monthly_budget"
								value={budget.monthly_budget}
								thousandSeparator={true}
								decimalScale={2}
								prefix={"$"}
								onChange={(e)=>handleChange(e,setBudget, budget)}
							/>
						</div>
						<div className="budget-entry-submit">
							<button className="submit" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
		);
};

export default CreateBudget;
