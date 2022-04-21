import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import colors from "./colors";

const Entry = ({category, name, price, date, id, index, handleDelete}) => {
	const { FontAwesomeIcon } = useContext(AppContext);
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
	)}

export default Entry;
