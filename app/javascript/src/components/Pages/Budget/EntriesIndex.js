import React, { useState, useEffect } from 'react';
import axios from 'axios';
import colors from './colors';

const EntriesIndex = ({global,refreshKey,currentBudget}) => {
	const [entries, setEntries] = useState([]);
	useEffect(()=> {
		const config = {
			headers: { Authorization: global.authorizationToken }
		}
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

	const entryList = entries.map((entry, index) => {
		const { category, name, price, date } = entry.attributes
		return (
			<tr className={colors[category]} key={index}>
				<td className="entry-col">{category}</td>
				<td className="entry-col">{name}</td>
				<td className="entry-col">{price}</td>
				<td className="entry-col">{date}</td>
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
