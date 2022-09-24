import {
	addItemToCart,
	removeItemFromCart,
	deleteItemFromCart,
	calculateTotal
} from './helpers';

const initialState = {
	stats: {
		total: 0,
		shipping: 0
	},
	items: []
};

const reducer = (state=initialState, action) => {
	switch(action.type) {
		case 'cart/addItem': {
			const updatedItems = addItemToCart(state.items, action.payload);

			return {
				...state,
				items: updatedItems,
				stats: {
					...state.stats,
					total: calculateTotal(updatedItems)
				}
			}
		};
		case 'cart/removeItem': {
			const updatedItems = removeItemFromCart(state.items, action.payload);
			return {
				...state,
				items: updatedItems,
				stats: {
					...state.stats,
					total: calculateTotal(updatedItems)
				}
			}
		};
		case 'cart/clearCart': {
			return initialState;
		};
		case 'cart/deleteItem': {
			const updatedItems = deleteItemFromCart(state.items, action.payload);

			return {
				...state,
				items: updatedItems,
				stats: {
					...state.stats,
					total: calculateTotal(updatedItems)
				}
			}
		};
		default: return state;
	}
}

export default reducer;