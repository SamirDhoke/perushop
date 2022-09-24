import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import CheckoutPublic from './CheckoutPublic';
import CheckoutPrivate from './CheckoutPrivate';
import MiniCart from '../../components/MiniCart';
import Stepper from '../../components/Stepper';

import requireAuth from '../../hoc/requireAuth';

const TOTAL_STEPS = 4;

const Checkout = props => {

	if ( props.isCartEmpty ) {
		return <Redirect to='/cart' />
	}

	return (
		<div className="p-8">
			<p className="text-blue-500 text-sm"><small>Almost there</small></p>
			<h1 className="text-4xl mt-2 font-semibold">Checkout</h1>

			{/*STEPPER*/}
			<div className="flex w-full md:w-1/2 mt-8">
				<Stepper
					curStep={props.step}
					totalSteps={TOTAL_STEPS}
				/>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
				
				<div className="w-full">
					<Switch>
						<Route path='/checkout/public' component={CheckoutPublic} />
						<Route path='/checkout/private' component={requireAuth(CheckoutPrivate)} />
					</Switch>										
				</div>								

				<div>
					<MiniCart />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({ 
	isCartEmpty: state.cart.items.length === 0,
	step: state.checkout.step,
});

export default connect(mapStateToProps)( Checkout );