const selectCart = state => state.cart;

export const selectItemsCount = state => selectCart(state).items.reduce((total, item) => {
	return total + item.qty
}, 0);