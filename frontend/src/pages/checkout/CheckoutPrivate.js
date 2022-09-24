import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AddressDetails from '../../components/checkout/AddressDetails';
import BillingDetails from '../../components/checkout/BillingDetails';
import PaymentDetails from '../../components/checkout/PaymentDetails';

const CheckoutPrivate = props => {
	const { step } = props;
	const { goToBilling, goToPayment, history } = props;

	if (step < 2) {
		return <Redirect to='/public' />
	}

	return (
		<div className="w-full">
	 		{ step === 2 && <AddressDetails next={goToBilling}/> }
			{ step === 3 && <BillingDetails next={goToPayment}/> }
			{ step === 4 && <PaymentDetails /> }
		</div>
	)
}


const mapStateToProps = state => ({ 
	step: state.checkout.step
});

const mapDispatchToProps = dispatch => ({ 
	goToShipping: () => dispatch({ type: "checkout/goToShipping" }),
	goToBilling: () => dispatch({ type: "checkout/goToBilling" }),
	goToPayment: () => dispatch({ type: "checkout/goToPayment" })
});

export default connect(mapStateToProps, mapDispatchToProps)( CheckoutPrivate );