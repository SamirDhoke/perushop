import React from 'react';
import { connect } from 'react-redux';

const Sort = props => {
	
	const { products, sort, applySort } = props;

	const handleSortChange = e => {
		const preference = e.target.value;
		const [field, type] = preference.split(' ');
		
		applySort(field, type)
	}

	return (
		<div className="">
			<select 
				className="form-select appearance-none px-4 pr-12 bg-no-repeat bg-center py-2 bg-transparent border-2 border-gray-100 rounded-full text-sm"
				style={{
					backgroundImage: `url('/chevronDown.svg')`,
					backgroundSize: '1rem 1rem',
					backgroundPositionX: '90%'
				}}
				onChange={handleSortChange}
				defaultValue="Sort By"
			>
				<option disabled value="Sort By">Sort by</option>
				<option value="Price A-Z">Price A-Z</option>
				<option value="Price Z-A">Price Z-A</option>
				<option value="Name A-Z">Name A-Z</option>
				<option value="Name Z-A">Name Z-A</option>
			</select>
		</div>
	)
}

const mapStateToProps = (state) => ({
	sort: state.categories.filter.sort,
	products: state.categories.filteredProducts
});

const mapDispatchToProps = (dispatch) => ({
	applySort: (f, t) => dispatch({ type: 'categories/applySort', payload: { sortBy: f, sortType: t } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort)