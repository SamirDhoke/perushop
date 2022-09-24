const initialState = false;

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case 'nav/toggleNav': {
			return !state;
		}
		default: return state;
	}
}

export default reducer;