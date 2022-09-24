import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';

import AppliedFilter from './AppliedFilter';

const Filter = props => {
	
	const { 
		products, 
		filter,
		toggleFilter
	} = props;

	const handleAddFilter = e => {
		const selectedFilter = e.target.dataset.filter;
		const filterValue = e.target.value;

		toggleFilter(selectedFilter, filterValue);
	}

	return (
		<div className="flex flex-col">
			
			<div className="">
				<select
					className="form-select appearance-none px-4 pr-12 bg-no-repeat bg-center py-2 bg-transparent border-2 border-gray-100 rounded-full text-sm"
					style={{
						backgroundImage: `url('/chevronDown.svg')`,
						backgroundSize: '1rem 1rem',
						backgroundPositionX: '90%'
					}}
					data-filter="priceRange" 
					onChange={handleAddFilter}
					defaultValue="Price"
				>
					<option disabled value="Price">Price</option>						
					<option value="0-99">0-99</option>
					<option value="100-199">100-199</option>
					<option value="200-299">200-299</option>
					<option value="300-399">300-399</option>
					<option value="400-499">400-499</option>
				</select>						
			</div>

			<div className="mt-4">
				<AppliedFilter/>
			</div>

		</div>
	)
}

const mapStateToProps = (state) => ({
	filter: state.categories.filter
});

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: (filter, value) => dispatch({ type: 'categories/toggleFilter', payload: { filter, value } }),	
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter)