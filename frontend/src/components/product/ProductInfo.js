import React from 'react';
import Rating from './Rating';

const ProductInfo = props => {
	const { name, rating, price, discount, small=false } = props;
	const askedPrice = Math.floor( (1 + discount) * price );

	const headingClasses = `${small ? "text-2xl" : "text-4xl"} font-bold`
	const discountClasses = `${small ? "text-sm" : "text-md"} text-gray-300 line-through font-bold`
	const priceClasses = `${small ? "text-md" : "text-lg"} font-bold`

	return (
		<div>
			<h1 className={headingClasses}>{name}</h1>

			<div className="flex space-x-4 mt-0 items-center">					
				<Rating score={rating}/>
				
				<div className="space-x-2">
					{
						discount 
						? <span className={discountClasses}>₹{askedPrice}</span>
						: null
					}
					<span className={priceClasses}>₹{price}</span>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo