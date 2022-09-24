const initialState = {
	step: 1,
	data: {
		isBillingShippingSame: false,
		billingAddress: {
			fullName: '',
			house: '',
			street: '',
			landmark: '',
			city: '',
			country: '',
			zip: ''	
		},
		shippingAddress: {
			fullName: '',
			house: '',
			street: '',
			landmark: '',
			city: '',
			country: '',
			zip: ''	
		},
		paymentMethod: "OFFLINE",
		paymentInitiated: false,
		paymentDetails: null
	}
};

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case "checkout/goToShipping": {
			const curStep = state.step;
			
			if (curStep !== 1) {
				return state;
			}

			return {
				...state,
				step: 2
			}
		}

		case "checkout/goToBilling": {			
			const curStep = state.step;
			
			if (curStep !== 2) {
				return state;
			}

			return {
				...state,
				step: 3
			}
		};

		case "checkout/goToPayment": {
			const curStep = state.step;
			
			if (curStep !== 3) {
				return state;
			}

			return {
				...state,
				step: 4
			}
		};

		case "checkout/setShippingAddress": {
			const updatedShippingAddress = action.payload;
			return ({
				...state,
				data: {
					...state.data,
					shippingAddress: updatedShippingAddress
				}
			});
		};

		case "checkout/setBillingAddress": {
			const updatedBillingAddress = action.payload;
			return ({
				...state,
				data: {
					...state.data,
					billingAddress: updatedBillingAddress
				}
			});
		};

		case "checkout/setPaymentOption": {
			const method = action.payload;
			return ({
				...state,
				data: {
					...state.data,
					paymentMethod: method
				}
			});
		};

		case "checkout/setPaymentData": {
			const data = action.payload;
			return ({
				...state,
				data: {
					...state.data,
					paymentDetails: data
				}
			});
		};

		case "checkout/toggleBillingShippingSame": {
			const isAddressSame = state.data.isBillingShippingSame;
			let updatedBillingAddress = initialState.data.billingAddress;

			if (!isAddressSame) { // the NOT same address is to be toggled to same
				updatedBillingAddress = state.data.shippingAddress;
			} else {
				updatedBillingAddress = initialState.data.billingAddress;				
			}

			return {
				...state,
				data: {
					...state.data,
					billingAddress: updatedBillingAddress,
					isBillingShippingSame: !state.data.isBillingShippingSame
				}
			}
		}

		case "checkout/initiatePayment": {
			return {
				...state,
				data: {
					...state.data,
					paymentInitiated: true
				}
			}
		}

		case "checkout/reset": {
			return initialState;
		}

		default: return state;
	}
}

export default reducer;