import React from 'react'
import { XIcon } from '@heroicons/react/outline'

const MiniProduct = props => {
	const { product, deleteItemFromCart } = props;

	const {
		images,
		name,
		price,
		discount=0
	} = product

	const handleDeleteFromCart = e => deleteItemFromCart(product);

	const askedPrice = Math.ceil(price * (1 + discount));

	return (
		<div className="mini-product flex items-center w-full">
			<div className="image basis-1/3">
				<img 
					src={images[0]} 
					alt='product'
					className="rounded-xl p-1 aspect-square"
				/>
			</div>
			
			<div className="info w-full mx-4">
				
				<h1 className="font-bold text-lg">{name}</h1>
				
				<div className="space-x-2">
					<span className="text-xs text-gray-300 line-through font-bold">₹{askedPrice}</span>
					<span className="text-sm font-bold">₹{price}</span>
				</div>

			</div>

			<button 
				className="border-2 p-2 rounded-full"
				onClick={handleDeleteFromCart}
			>
				<XIcon className="h-4 w-4 text-red-500" />
			</button>

		</div>
	)
}

export default MiniProduct