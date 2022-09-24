import React from 'react';
import { XIcon } from '@heroicons/react/outline'
import { connect } from 'react-redux';

import Counter from './Counter';

const CartItem = props => {

	const { 
		product, 
		addItemToCart, 
		removeItemFromCart,
		deleteItemFromCart
	} = props;
	
	const { 
		name,
		images,
		price,
		stock
	} = product;

	const handleAddToCart = () => {
		addItemToCart(product);
	}

	const handleRemoveFromCart = () => {
		removeItemFromCart(product);
	}

	const handleDeleteFromCart = () => {
		deleteItemFromCart(product);
	}

	return (
		<div 
			className="flex flex-col items-center border-2 p-4 rounded-xl sm:flex-row sm:space-x-12"
		>			
			<div className="p-8">
				<img 
					src={images[0]} 
					alt='product'
					className="rounded-xl aspect-square w-48"
				/>
			</div>
			
			<div className="flex-1 flex flex-col justify-around items-center sm:items-start">
				<h1 className="mt-2 capitalize text-xl font-bold sm:text-2xl md:text-3xl">{name}</h1>
				<h2 className="mt-2 capitalize text-xl font-bold">₹{price}</h2>
				<div className="w-fit mt-2 flex items-stretch space-x-4">
					<Counter 
						count={product.qty}
						onIncr={handleAddToCart}
						onDecr={handleRemoveFromCart} 
					/> 
					<button className="border-2 p-2 rounded-full" onClick={handleDeleteFromCart}>
						<XIcon className="h-6 w-6 text-red-500" />
					</button>					
				</div>
			</div>

		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch({ type: 'cart/addItem', payload: item }),
	removeItemFromCart: (item) => dispatch({ type: 'cart/removeItem', payload: item }),
	deleteItemFromCart: (item) => dispatch({ type: 'cart/deleteItem', payload: item })
})

const connectedCartItem = connect(null, mapDispatchToProps)(CartItem);

export default connectedCartItem;