import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductInfo from './ProductInfo';

const Product = (props) => {
	const {
		id,
		name,
		description,
		images,
		price,
		discount=0,
		score=4,
		history,
		addItemToCart
	} = props;

	const [focused, updateFocused] = React.useState(false);

	const askedPrice = Math.floor( (1 + discount) * price );
	
	const handleClick = (e) => {
		history.push(`/product/${id}`);
	}

	const handleAddToCart = () => {
		const productInfo = {
			id,
			qty: 1,
			name,
			price,
			images,
			discount	
		}

		addItemToCart(productInfo);
	}

	return (
		<div className="">
			
			<div className="relative" onMouseOver={() => updateFocused(true)} onMouseOut={() => updateFocused(false)}>
				<div className="p-0">
					<img 
						src={images[0]} 
						alt='product'
						className="p-2 rounded-xl w-full aspect-square object-fit object-cover"
						onClick={handleClick}
					/>
				</div>
				<button 
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold w-fit rounded-full text-sm px-3 py-2 bg-green-500 text-white"
					style={{ display: focused ? 'block' : 'none' }}
					onClick={handleAddToCart}
					>
					Add to cart
				</button>
				{
					discount  
					? <span className="absolute font-semibold top-5 -right-2 rounded-full text-sm px-2 py-1 bg-red-500 text-white">{Math.floor(discount * 100)}% OFF</span>
					: null
				}
			</div>
			
			<div className="mt-4">
				<ProductInfo
					name={name}
					price={price}
					discount={discount}
					rating={score}
					small={true}
				/>
			</div>

		</div>
	)
}


const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch({ type: 'cart/addItem', payload: item })
})

const connectedProduct = connect(null, mapDispatchToProps)(Product);

export default withRouter(connectedProduct);