import React from 'react';

const CartTotal = props => {
	const { stats } = props;

	const {
		subtotal,
		shipping
	} = stats;

	const total = subtotal + shipping;

	return (		
		<div className="flex flex-col">
			<div className="flex justify-between">
				<span>Subtotal:</span>
				<span>₹{subtotal}</span>
			</div>			
			<div className="flex justify-between">
				<span>Shipping:</span>
				<span>₹{shipping}</span>
			</div>
			<div className="flex justify-between font-bold mt-2">
				<span>Total:</span>
				<span>₹{total}</span>
			</div>
		</div>					
	)
}

export default CartTotal;