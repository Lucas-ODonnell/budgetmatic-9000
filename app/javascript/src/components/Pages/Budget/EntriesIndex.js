import React, { useState, useEffect } from 'react';
import axios from 'axios';
import colors from './colors';
import Filter from './Filter';

const EntriesIndex = ({global, FontAwesomeIcon,refreshKey,currentBudget, setRefreshKey}) => {
	const [entries, setEntries] = useState([]);
	const config = {
		headers: { Authorization: global.authorizationToken }
	}

	useEffect(()=> {
		axios.get('/api/v1/budget_entries.json', config)
			.then(response => {
				const array = []
				const objects = response.data.data
				objects.forEach(object => array.push(object))
				setEntries(array)
			})
			.catch(response => {
				if (response.response.status === 401) {
					global.setSignedIn(false);
				}
			})
	}, [refreshKey]);

	const handleDelete = (id) => {
		axios.delete(`/api/v1/budget_entries/${id}`, config)
			.then(response => {
				setRefreshKey(oldKey => oldKey + 1)
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
				<Filter />	
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
					<div className="total-cost">
						Total: {currentBudget.total_cost}
					</div>
				</div>
			</div>
		</section>
	)
}

export default EntriesIndex;
