const initialState = {
	product: null,
	qty: 1,
	isProductLoaded: false,
	similarProducts: []
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		
		case "product/initProduct": 
			return {
				...state,
				product: action.payload,
				isProductLoaded: true
			}
		
		case "product/initSimilarProducts": { 
			return {
				...state,
				similarProducts: [...action.payload],				
			}
		}

		case "product/addQty": {
			const isStock = state.qty < state.product.stock;
			
			return {
				...state,
				qty: isStock ? state.qty + 1 : state.qty
			}
			
		};

		case "product/removeQty": 			
			return {				
				...state,
				qty: state.qty > 1 ? state.qty - 1 : state.qty				
			};

		case "product/resetProduct": return initialState;
		
		default: return state;
	}
}

export default reducer;