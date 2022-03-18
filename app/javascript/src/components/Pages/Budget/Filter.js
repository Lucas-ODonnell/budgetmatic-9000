import React, { useState } from 'react';
import { categories, months } from './Items';
import Dropdown from './Dropdown.js';

const Filter = () => {
	return (
		<div className="filter-options">
			<Dropdown title="Filter by Category" items={categories} multiSelect />
			<Dropdown title="Start" items={months} />
			<Dropdown title="End" items={months} />
		</div>
	)
}

export default Filter
