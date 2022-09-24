import React from 'react';
import { ElementsConsumer, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import paymentServices from '../../services/paymentServices';
import orderServices from '../../services/orderServices';

const SpinningLoader = props => {
	const [rotation, setRotation] = React.useState(0);

	React.useEffect(() => {
		const id = setInterval(() => setRotation(prev => 180 - prev), 1000);

		return () => clearInterval(id);
	}, []);

	if (!props.loading) {
		return null;
	}		

	return (
		<span className={`inline-block h-4 aspect-square border-2 border-gray-100 rounded-full mx-2 border-b-transparent transition-transform transform rotate-${rotation}`} />
	)
}

const OnlinePayment = props => {

	const { stripe, elements } = props; // stripe
	const { resetCheckout, resetCart, initiatePayment } = props; // method
	const { checkoutData, user, cart, history, isPaymentInitiated } = props; // states

	const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);

	const handleSubmit = e => {
		e.preventDefault();

		if (!stripe || !elements) {
			console.error('Stripe is not initialized.')
		}

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
				paymentType: 'ONLINE',
				paymentStatus: 'UNPAID'
			}
		}

		const card = elements.getElement(CardNumberElement);	

		initiatePayment();

		paymentServices
			.createPayment(user.auth, order)	
			.then(result => {
				// confirm the order
				return stripe.confirmCardPayment(result.secret, {
					payment_method: {
						card,
						billing_details: {
							name: order.billing.address.fullName
						}
					}
				})
			})
			.then(res => {
				// create the order in server
				return orderServices.createOrder({
					...order,
					payment: {
						...order.payment,
						paymentStatus: 'PAID'
					}
				}, user.auth)
			})
			.then(createdOrder => {
				// after all done
				resetCart();
				resetCheckout();
				setTimeout(() => history.push(`/orders/${createdOrder.id}`), 500)
			})
			.catch(e => console.error(e));
	}

	return (
		<div >
			<button
				onClick={ e => setIsPaymentOpen(prev => !prev) }
				className="w-full rounded-full bg-green-400 text-gray-100 font-semibold text-sm py-2"
			>Pay with card</button>
			{
				isPaymentOpen
				? (
				<div>
					<form onSubmit={handleSubmit} className="grid grid-cols-1">
						<div className="my-2 flex flex-col gap-2">
							<div>
								<label>Card Number</label>
								<CardNumberElement className="border-2 p-2"/>
							</div>							
							<div className="flex gap-2 w-full">
								<div className="flex-1">
									<label>Card Expiration</label>
									<CardExpiryElement className="border-2 p-2"/>
								</div>
								<div className="flex-1">
									<label>Card CVC</label>
									<CardCvcElement className="flex-1 border-2 p-2"/>
								</div>								
							</div>
						</div>
						<div className="w-full flex justify-center">
							<button 
								className="w-1/2 flex justify-center items-center rounded-full bg-green-500 text-gray-100 font-semibold text-sm py-2 disabled:bg-green-300"
								type="submit"
								disabled={isPaymentInitiated}
							>Pay now <SpinningLoader loading={isPaymentInitiated}/> </button>
						</div>
						{ isPaymentInitiated && <p className="text-xs mt-2">Your payment is getting processed, please do not refresh or close this page</p> }						
					</form>					
				</div>
				)
				: null
			}			
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.user,
	checkoutData: state.checkout.data,
	cart: state.cart,
	isPaymentInitiated: state.checkout.data.paymentInitiated 
})

const mapDispatchToProps = dispatch => ({
	initiatePayment: () => dispatch({ type: "checkout/initiatePayment" }),
	resetCheckout: () => dispatch({ type: "checkout/reset" }),
	resetCart: () => dispatch({ type: "checkout/clearCart" })
})

const ConnectedOnilinePayment = connect(mapStateToProps, mapDispatchToProps)( withRouter(OnlinePayment) )

const InjectedOnlinePayment = props => {
	return (
		<ElementsConsumer>
			{ ({stripe, elements}) => <ConnectedOnilinePayment stripe={stripe} elements={elements} {...props}/> }
		</ElementsConsumer>
	)
}

export default InjectedOnlinePayment