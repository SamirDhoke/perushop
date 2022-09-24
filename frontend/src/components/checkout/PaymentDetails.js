import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OnlinePayment from './OnlinePayment';

import paymentServices from '../../services/paymentServices';
import orderServices from '../../services/orderServices';

import { STRIPE_PK } from '../../config';

const stripe = loadStripe(STRIPE_PK);

const PaymentDetails = props => {

	const { resetCheckout, resetCart, initiatePayment } = props;
	const { checkoutData, user, cart, history } = props;

	const handleOfflinePayment = e => {

		const order = {
			products: cart.items.map(item => ({ qty: item.qty, product: item.id })),
			shipment: {
				address: checkoutData.shippingAddress,
				charges: cart.stats.shipping
			},
			billing: {
				address: checkoutData.billingAddress,
				charges: cart.stats.total
			},
			payment: {
				paymentType: 'OFFLINE',
				paymentStatus: 'UNPAID'
			}
		}

		orderServices
			.createOrder(order, user.auth)
			.then(data => {
				resetCart();
				resetCheckout();
				setTimeout(() => history.push(`/orders/${data.id}`), 500)
			})
			.catch(e => console.error(e));
	}

	return (
		<div className="mini-sign-in border-2 p-8 w-full rounded-xl">					
			<h1 className="text-2xl font-bold mt-2">Payment Details</h1>
			
			<div className="mt-8">
				
				<div className="">
					
					<Elements stripe={stripe} appearance={{ theme: 'flat' }}>
						<OnlinePayment />
					</Elements>	
					
				</div>

				<button 
					className="w-full border-2 rounded-full text-gray-900 font-semibold text-sm mt-8 py-2"										
					onClick={handleOfflinePayment}
				>
					Cash on delivery
				</button>
			</div>							

		</div>
	)
}

const mapStateToProps = state => ({
	checkoutData: state.checkout.data,
	cart: state.cart,
	user: state.user
})

const mapDispatchToProps = dispatch => ({
	resetCheckout: () => dispatch({ type: "checkout/reset" }),
	resetCart: () => dispatch({ type: "checkout/clearCart" })
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(PaymentDetails) );