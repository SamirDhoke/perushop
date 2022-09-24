import React from 'react';
import { connect } from 'react-redux';

import MiniSignIn from '../../components/checkout/MiniSignin';

const CheckoutPublic = props => {
	const { isLoggedIn, initiateCheckout, history } = props;

	React.useEffect(() => {
		if (isLoggedIn) {
			initiateCheckout();
			history.push('/checkout/private');
		}
	}, [isLoggedIn])

	return <MiniSignIn />
}

const mapStateToProps = state => ({ 
	isLoggedIn: state.user !== null,
});

const mapDispatchToProps = dispatch => ({ 
	initiateCheckout: () => dispatch({ type: "checkout/goToShipping" })
});

export default connect(mapStateToProps, mapDispatchToProps)( CheckoutPublic );