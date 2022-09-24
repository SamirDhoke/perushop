import React from 'react';
import { connect } from 'react-redux';

import Pagination from '../../components/Pagination';
import Filter from '../../components/Filter';
import Sort from '../../components/Sort';

import productServices from '../../services/productServices';

const CategoryProducts = props => {
	
	const {
		initProducts,
		products,
		match
	} = props;

	const category = match?.params?.category || 'domestic';

	React.useEffect(() => {		
		productServices
			.getProducts(category)
			.then(data => {
				initProducts(data)
			})
			.catch(e => console.error(e));
	}, [category])

	return (
		<div className="m-6">
			<p className="text-blue-500 text-sm"><small>{category} guavas</small></p>
			<h1 className="text-4xl mt-2 font-semibold">Explore {category} guavas</h1>
			
			{/*Filter and Sort*/}
			<div className="mt-8 flex justify-between items-start">				
				<Filter/>					
				<Sort/>
			</div>

			<div className="mt-8">
				<Pagination/>
			</div>

		</div>
	)
}

const mapStateToProps = (state) => ({
	products: state.categories.filteredProducts
});

const mapDispatchToProps = (dispatch) => ({
	initProducts: (data) => dispatch({ type: 'categories/initProducts', payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);