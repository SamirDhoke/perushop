import React from 'react';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';

import { connect } from 'react-redux';

const Cart = props => {

	const {
		cart,
		clearCart,
		isCartEmpty
	} = props;

	const total = cart.stats.total;
	
	const handleCheckout = () => {
		props.history.push('/checkout/public');
	}

	return (
		<div className="m-8">

			<div className="flex flex-col sm:flex-row justify-between">
				<div className="space-y-3">
					<p className="text-xs italic text-blue-500">Your cart</p>
					<h1 className="font-bold text-3xl mt-2">Shopping cart</h1>
				</div>
				<div className="mt-4 sm:mt-0">
					<button 
						className="border-2 px-6 font-semibold py-2 border-2-100 rounded-full"
						onClick={clearCart}
					>
						Clear all
					</button>
				</div>
			</div>

			<div className="mt-12 flex flex-col sm:flex-row space-y-12 sm:space-x-12 sm:space-y-0">
				<div className="flex-1 space-y-12">
					{
						cart.items.map(product => (
								<CartItem 
									product={product} 
									key={product.id} 
								/>
							) 
						)
					}
				</div>

				<div className="basis-1/4 h-fit border-2 p-8 rounded-xl">
					<div className="cart-total">
						<h1 className="text-2xl font-bold capitalize">Cart total</h1>
						<div className="mt-4">
							<CartTotal
								stats={{
									subtotal: total,									
									shipping: 0
								}}
							/>
						</div>
						<button 
							className="w-full mt-8 px-4 py-2 bg-green-500 rounded-full text-white font-bold disabled:bg-green-300"
							onClick={handleCheckout}
							disabled={isCartEmpty}
						>
							Checkout
						</button>
					</div>					
				</div>
			</div>

		</div>
	)
}

const mapStateToProps = state => ({ 
	cart: state.cart,
	isCartEmpty: state.cart.items.length === 0 
});

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch({ type: 'cart/clearCart' })
})

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default connectedCart;