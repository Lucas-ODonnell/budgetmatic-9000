import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import colors from './colors';

const EntriesIndex = ({refreshKey,global, FontAwesomeIcon}) => {
	const [entryRefreshKey, setEntryRefreshKey] = useState(0);
	const [entries, setEntries] = useState([]);
	const [tags, setTags] = useState([]);
	const [query, setQuery] = useState("");
	const [total, setTotal] = useState(0)
	const [months, setMonths] = useState({
		start: "January",
		end: "December"
	});
	const config = {
		headers: { Authorization: global.authorizationToken }
	}


	useEffect(()=> {
		getBudgetEntries()
	}, [refreshKey, entryRefreshKey]);

	const getBudgetEntries = () => {
		setTotal(0)
		axios.get(`/api/v1/budget_entries${query}`, config)
			.then(response => {
				const array = []
				const objects = response.data.data
				objects.forEach(object => {
					let thisPrice = object.attributes.int_price;
					setTotal(total => total + thisPrice)
					array.push(object);
					})
				setEntries(array)
			})
			.catch(response => {
				if (response.response.status === 401) {
					global.setSignedIn(false);
				}
			})
	}

	const handleMonthsChange = (e) => {
		e.preventDefault();
		setMonths({...months, [e.target.name]: e.target.value})
	}

	const handleFilterSubmit = (e) => {
		e.preventDefault();
		let thisQuery = "?"
		tags.forEach((tag,index) => (
			thisQuery += `category${index}=${tag}&`
		))
		//let queryFragment = Object.keys(months).map(key => key + '=' + months[key]).join('&');
		//query += queryFragment
	  setQuery(thisQuery)	
		setEntryRefreshKey(oldKey => oldKey + 1)
	}

	const handleDelete = (id) => {
		axios.delete(`/api/v1/budget_entries/${id}`, config)
			.then(response => {
				setEntryRefreshKey(oldKey => oldKey + 1)
			})
			.catch(response => {
				console.log(response)
			})
	}

	const entryList = entries.map((entry, index) => {
		const { category, name, price, date } = entry.attributes
		const { id } = entry
		return (
			<tr className={colors[category]} key={index}>
				<td className="entry-col">{category}</td>
				<td className="entry-col">{name}</td>
				<td className="entry-col">{price}</td>
				<td className="entry-col">{date}</td>
				<td className="entry-col delete"><button onClick={()=>{handleDelete(id)}}><FontAwesomeIcon icon="fas fa-times" /></button></td>
			</tr>
		)
	})
	return (
		<section>
			<div className="entries-container">
				<div className="entries-content">
					<table>
						<thead>
							<tr>
								<th scope="col">Category</th>
								<th scope="col" >Name</th>
								<th scope="col">Price</th>
								<th scope="col">Month</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{entryList}
						</tbody>
					</table>
				</div>
			</div>
			<Filter {...{total, tags, setTags, handleFilterSubmit, handleMonthsChange, months}} />
		</section>
	)
}

export default EntriesIndex;
