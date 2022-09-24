import React from 'react';
import {
	Link
} from 'react-router-dom';
import HeroCard from '../components/HeroCard';
import ProductList from '../components/ProductList';

import productServices from '../services/productServices';

const Page = props => {
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		productServices
			.getProducts()
			.then(data => {				
				setProducts(data.slice(0, 8))
			})
			.catch(e => console.error(e));
	}, [])

	return (
		<section>
			<HeroCard />
			<div>
				
				<div className="m-4 mt-8 text-center sm:text-left">
					<p className="text-blue-500 font-sm italic"><small>Our products</small></p>
					<h1 className="font-bold mt-2 text-2xl sm:text-3xl">Explore our products</h1>
				</div>

				<div className="p-4">
					<ProductList
						products={products}
					/>
				</div>

				<div className="flex mt-12 mb-12 justify-center">
					<Link 
						to="/categories/domestic"						
						className="bg-green-500 px-8 py-4 text-white font-bold rounded-full text-md"
					>View All</Link>
				</div>

			</div>
		</section>
	)
}

export default Page;