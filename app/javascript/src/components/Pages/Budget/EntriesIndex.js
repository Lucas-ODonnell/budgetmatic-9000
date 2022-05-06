import React, { useState, useEffect } from "react";
import {useGlobalContext} from "../../../context/AppContext";
import { useBudgetContext } from "../../../context/BudgetContext";
import Entry from './Entry';
import axios from "axios";
import Filter from "./Filter";
import EntryTableHeader from "./EntryTableHeader";

const EntriesIndex = () => {
	const {
		authorizationToken,
		setSignedIn,
		renderEntry,
		rerenderEntry,
		FontAwesomeIcon
	} = useGlobalContext();
	
	const { currentBudget, entries, setEntries, total, setTotal, setShowGraph } = useBudgetContext();
	const id = `?id=${currentBudget.id}&`;
	const [tags, setTags] = useState([]);
	const [query, setQuery] = useState("");
	const [income, setIncome] = useState(0);
	const [date, setDate] = useState({
		start: "",
		end: "",
	});
	const config = {
		headers: { Authorization: authorizationToken },
	};

	useEffect(() => {
		getBudgetEntries();
	}, [renderEntry]);

	const getBudgetEntries = async () => {
		setTotal(0);
		setIncome(0);
		try {
			const response = await axios.get(`/api/v1/budget_entries${id}${query}`, config)
			setIncome(currentBudget.attributes.int_monthly_budget);
			setQuery(`?id=${currentBudget.id}&`);
			const array = [];
			const objects = response.data.data;
			objects.forEach((object) => {
				let thisPrice = object.attributes.int_price;
				setTotal((total) => total + thisPrice);
				array.push(object);
			});
			setEntries(array);
		} catch (err) {
			console.error(err)
			setSignedIn(false)
		}
	};

	const handleDateChange = (e) => {
		e.preventDefault();
		setDate({ ...date, [e.target.name]: e.target.value });
	};

	const handleFilterSubmit = (e) => {
		e.preventDefault();
		let thisQuery = "";
		tags.forEach((tag, index) => (thisQuery += `category${index}=${tag}&`));
		let queryFragment = Object.keys(date)
		.map((key) => key + "=" + date[key])
		.join("&");
		thisQuery += queryFragment;
		setQuery(thisQuery);
		rerenderEntry()
		setShowGraph(false);
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(`/api/v1/budget_entries/${id}`, config)
			rerenderEntry();
			setShowGraph(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section>
			<div className="entries-container">
				<div className="entries-content">
					<table>
						<EntryTableHeader />
						<tbody>{
							entries.map((entry) => {
								const { category, name, price, date } = entry.attributes
								const { id } = entry
								return (
									<Entry key={id} {...{category, name, price, date, handleDelete, FontAwesomeIcon, id}} />
								);
							})
						}</tbody>
					</table>
				</div>
			</div>
			<Filter
				{...{
					total,
					income,
					tags,
					setTags,
					handleFilterSubmit,
					handleDateChange,
					date,
				}}
				/>
		</section>
	);
};

export default EntriesIndex;
