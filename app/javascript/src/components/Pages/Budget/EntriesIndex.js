import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../../context/AppContext";
import BudgetContext from "../../../context/BudgetContext";
import axios from "axios";
import Filter from "./Filter";
import colors from "./colors";

const EntriesIndex = () => {
	const {
		authorizationToken,
		setSignedIn,
		FontAwesomeIcon,
		renderEntry,
		setRenderEntry,
	} = useContext(AppContext);
	const { currentBudget, entries, setEntries, total, setTotal, setShowGraph } =
	useContext(BudgetContext);
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
		setRenderEntry((oldKey) => oldKey + 1);
		setShowGraph(false);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/budget_entries/${id}`, config)
			.then((response) => {
				setRenderEntry((oldKey) => oldKey + 1);
				setShowGraph(false);
			})
			.catch((response) => {
				console.log(response);
			});
	};

	const entryList = entries.map((entry, index) => {
		const { category, name, price, date } = entry.attributes;
		const { id } = entry;
		return (
			<tr className={colors[category]} key={index}>
				<td className="entry-col">{category}</td>
				<td className="entry-col">{name}</td>
				<td className="entry-col">{price}</td>
				<td className="entry-col">{date}</td>
				<td className="entry-col delete">
					<button
						onClick={() => {
							handleDelete(id);
						}}
					>
						<FontAwesomeIcon icon="fas fa-times" />
					</button>
				</td>
			</tr>
		);
	});
	return (
		<section>
			<div className="entries-container">
				<div className="entries-content">
					<table>
						<thead>
							<tr>
								<th scope="col">Category</th>
								<th scope="col">Name</th>
								<th scope="col">Price</th>
								<th scope="col">Month</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>{entryList}</tbody>
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
