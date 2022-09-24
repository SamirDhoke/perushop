const initialState = null

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case 'user/loginUser': {
			return action.payload
		};
		case 'user/logoutUser': {			
			return initialState
		};
		default: return state;
	}
}

export default reducer;