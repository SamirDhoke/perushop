import React from 'react';
import Product from './product';

const ProductList = props => {
	const { products } = props;

	console.log(products)

	return (
		<div>
			<div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{ products.map( p => <Product {...p} key={p.id}/> ) }
			</div>
		</div>
	)
}

export default ProductList;