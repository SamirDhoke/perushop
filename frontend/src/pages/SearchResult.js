import React from 'react';
import { connect } from 'react-redux';

import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Sort from '../components/Sort';

import productServices from '../services/productServices';

const SearchResult = props => {
	
	const {
		searchQuery,
		initProducts,
		products
	} = props;

	React.useEffect(() => {
		productServices
			.getFilteredProducts(searchQuery)
			.then(data => {
				console.log(data)
				initProducts(data)
			})
			.catch(e => console.error(e));
	}, [searchQuery])

	console.log(products);

	return (
		<div className="m-6">
			<p className="text-blue-500 text-sm"><small>Results</small></p>
			<h1 className="text-4xl mt-2 font-semibold">Search Result</h1>
			
			{/*Filter and Sort*/}
			<div className="mt-8 flex justify-between items-start">				
				<Filter/>					
				<Sort/>
			</div>

			<div className="mt-8">
				<Pagination />
			</div>

		</div>
	)
}

const mapStateToProps = (state) => ({
	searchQuery: state.categories.filter.query,
	products: state.categories.filteredProducts
});

const mapDispatchToProps = (dispatch) => ({
	initProducts: (data) => dispatch({ type: 'categories/initProducts', payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);