import React, { useState } from "react";
import {useGlobalContext} from "../../../context/AppContext";
import {useBudgetContext} from "../../../context/BudgetContext";
import axios from "axios";
import CreateBudgetEntry from "./CreateBudgetEntry";
import EntriesIndex from "./EntriesIndex";
import NumberFormat from "react-number-format";

const ShowBudgetEntryContent = () => {
	const {
		FontAwesomeIcon,
		authorizationToken,
		setDeleteFunction,
		setShowWarning,
		setRenderBudget,
		handleChange
	} = useGlobalContext();
	const { currentBudget, setShowGraph } = useBudgetContext();
	const [showBudgetEntry, setShowBudgetEntry] = useState(false);
	const [editBudget, setEditBudget] = useState(false);
	const [update, setUpdate] = useState({
		name: `${currentBudget.attributes.name}`,
		monthly_budget: `${currentBudget.attributes.monthly_budget}`,
	});
	const config = {
		headers: { Authorization: authorizationToken },
	};

	const handleBudgetDelete = async () => {
		try {
			const response = await axios.delete(`/api/v1/budgets/${currentBudget.id}`, config)
			setRenderBudget((oldKey) => oldKey + 1);
			setShowGraph(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleBudgetUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`/api/v1/budgets/${currentBudget.id}`, update, config)
			setRenderBudget((oldKey) => oldKey + 1);
			setUpdate({
				name: `${currentBudget.attributes.name}`,
				monthly_budget: `${currentBudget.attributes.monthly_budget}`,
			});
			setShowGraph(false);
		} catch (error) {
			console.log(response);
		}
	};

	return (
		<>
			<div className="budget-header">
				{!editBudget ? (
					<>
						<h1
							onClick={() => {
								setEditBudget(true);
							}}
						>
							{currentBudget.attributes.name}
						</h1>
						<div className="budget-options">
							<button
								onClick={() => {
									setShowWarning(true);
									setDeleteFunction(() => () => handleBudgetDelete());
								}}
							>
								<FontAwesomeIcon icon="fas fa-times" />
							</button>
						</div>
						</>
				) : (
					<form
						onSubmit={(e) => {
							handleBudgetUpdate(e);
							setEditBudget(false);
						}}
						className="budget-entry-form update-form"
					>
						<div className="field">
							<label>Update Name </label>
							<input
								className="input"
								name="name"
								value={update.name}
								onChange={(e)=> handleChange(e, setUpdate, update )}
								/>
						</div>
						<div className="field">
							<label>Update Monthly Income </label>
							<NumberFormat
								className="input"
								name="monthly_budget"
								value={update.monthly_budget}
								thousandSeparator={true}
								decimalScale={2}
								prefix={"$"}
								onChange={(e)=> handleChange(e, setUpdate, update )}
								/>
						</div>
						<button onClick={() => setEditBudget(false)}>Cancel</button>
						<button className="update" type="submit">
						Update
						</button>
					</form>
				)}
			</div>
			<div
				className="budget-entry"
				onClick={() => {
					setShowBudgetEntry(!showBudgetEntry);
				}}
			>
				<div className="icon">
					{showBudgetEntry ? (
						<FontAwesomeIcon icon="fas fa-caret-down" />
					) : (
						<FontAwesomeIcon icon="fas fa-caret-right" />
					)}
				</div>
				<p>New Budget Entry</p>
			</div>
			{showBudgetEntry && <CreateBudgetEntry />}
			<EntriesIndex />
			</>
	);
};

export default ShowBudgetEntryContent;
