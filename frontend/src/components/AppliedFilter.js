import React from 'react';
import { connect } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';

const AppliedFilter = props => {
	const { filter, toggleFilter } = props;

	const getAppliedFilters = filters => {
		const trueKeys = {
			priceRange: []
		}

		const { priceRange } = filters;

		for (let range in priceRange) {
			if ( priceRange[range] ) { 
				trueKeys.priceRange.push(range)
			}
		}

		return trueKeys;
	}

	const appliedFilters = getAppliedFilters(filter.tags);

	const handleRemoveFilter = (filter, value) => {
		toggleFilter(filter, value);
	}

	return (
		<div>
			{
				Object.keys(appliedFilters).map(filterKey => {
					return (
						<div key={filterKey} className="space-x-2 flex">
							{
								appliedFilters[filterKey].map(filterValue => {
									return (
										<div
											onClick={ () => handleRemoveFilter(filterKey, filterValue) } 
											key={ filterValue }
											className="px-4 rounded-full text-xs cursor-pointer space-x-4 bg-gray-100"
										>
											<span className="py-2 inline-block">{filterValue}</span>
											<XIcon className="inline h-3 w-3 text-gray-500" />
										</div>
									)
								})
							}
						</div>
					)
				})
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	filter: state.categories.filter
});

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: (filter, value) => dispatch({ type: 'categories/toggleFilter', payload: { filter, value } }),	
});

export default connect(mapStateToProps, mapDispatchToProps)(AppliedFilter);