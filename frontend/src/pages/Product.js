import React from 'react';
import { connect } from 'react-redux';
import { HeartIcon } from '@heroicons/react/outline'

import ProductList from '../components/ProductList';
import Counter from '../components/Counter';
import ProductInfo from '../components/product/ProductInfo';
import ImageCarousal, {ImageCarousalMobile} from '../components/ImageCarousal';

import productServices from '../services/productServices';

const ProductPage = props => {
	const { // actions
		addItemToCart,
		addProductQty,
		removeProductQty,
		initProduct,
		initSimilarProducts,
		resetProduct
 	} = props;

 	const { // state
 		isProductLoaded,
 		productDetails,
 		selectedQty,
 		similarProducts
 	} = props;

	React.useEffect(() => {
		const productId = props.match.params.id;

		productServices
			.getProduct(productId)
			.then(data => {
				initProduct(data);
			})
			.catch(e => console.error(e));

		return () => resetProduct();
		
	}, []);

	React.useEffect(() => {
		
		if (!isProductLoaded) {
			return;
		}

		productServices
			.getProducts(productDetails.category)
			.then(data => {
				console.log(data);
				initSimilarProducts(data.slice(0, 4));
			})
			.catch(e => console.error(e));

		// return () => resetProduct();
		
	}, [isProductLoaded]);

	const handleAddToCart = () => {
		if (!isProductLoaded) {
			return;
		}

		const cartItem = {
			name: productDetails.name,
			id: productDetails.id,
			price: productDetails.price,
			discount: productDetails.discount,
			images: productDetails.images,
			qty: selectedQty
		}

		addItemToCart(cartItem);
	}

	if (!isProductLoaded) {
		return <h1>Loading...</h1>
	}

	return (
		<div className="grid grid-cols-2 gap-8">
			
			<ImageCarousal 
				images={productDetails.images} 
				discount={productDetails.discount}
			/>
			
			<ImageCarousalMobile 
				images={productDetails.images} 
				discount={productDetails.discount}
			/>

			<div className="col-span-2 sm:col-span-1 items-center sm:items-start flex flex-col justify-center">
				
				<div className="text-center sm:text-left">
					<ProductInfo
						name={productDetails.name}
						discount={productDetails.discount}
						rating={productDetails.rating || 4}
						price={productDetails.price}
					/>
				</div>

				<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-4 items-center mt-4">					
					
					<Counter 
						onIncr={addProductQty}
						onDecr={removeProductQty}
						count={selectedQty}
					/>

					<div className="flex space-x-4 items-center">
						
						<button 
							className="font-semibold w-fit rounded-full text-md px-3 py-2 bg-green-500 text-white"
							onClick={handleAddToCart}
							>
							Add to cart
						</button>

						<span className="border-2 p-2 rounded-full">
							<HeartIcon className="h-6 w-6 text-red-500" />
						</span>

					</div>
				</div>

			</div>

			<div className="col-span-2 mx-8 mt-12 text-center sm:text-left">
				<p className="text-sm italic text-blue-500"><small>Features</small></p>
				<h1 className="font-bold text-2xl mt-2">Product description</h1>
				<p className="mx-2 mt-4">{productDetails.description}</p>
			</div>
		
			<div className="col-span-2 mx-8 mt-12">
				<p className="text-sm italic text-blue-500"><small>Explore more</small></p>
				<h1 className="text-2xl font-bold mt-2">Related Products</h1>
				<ProductList 
					products={ similarProducts } 			
				/>
			</div>
		
		</div>
	)
}


const mapStateToProps = state => ({
	isProductLoaded: state.product.isProductLoaded,
	productDetails: state.product.product,
	selectedQty: state.product.qty,
	similarProducts: state.product.similarProducts
})

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch({ type: 'cart/addItem', payload: item }),
	addProductQty: () => dispatch({ type: "product/addQty" }),
	removeProductQty: () => dispatch({ type: "product/removeQty" }),
	initProduct: (product) => dispatch({ type: "product/initProduct", payload: product }),
	initSimilarProducts: (products) => dispatch({ type: "product/initSimilarProducts", payload: products }),
	resetProduct: () => dispatch({ type: "product/resetProduct" })
})

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default connectedProductPage;