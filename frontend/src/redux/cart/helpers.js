export const addItemToCart = (cart, item) => {
	const existingItem = cart.find(i => i.id === item.id);
	if (existingItem) {
		return cart.map(i => i.id === item.id ? {...i, qty : i.qty + 1} : i);
	} else {
		return [...cart, item];
	}
}

export const deleteItemFromCart = (cart, item) => {
	return cart.filter(i => i.id !== item.id);
}

export const removeItemFromCart = (cart, item) => {
	const existingItem = cart.find(i => i.id === item.id);
	if (existingItem) {
		if (existingItem.qty == 1) {
			return deleteItemFromCart(cart, item);
		} else {
			return cart.map(i => i.id === item.id ? {...i, qty : i.qty - 1} : i)			
		}
	} else {
		return cart;
	}
}

export const calculateTotal = (cart) => {
	return cart.reduce((total, prod) => total + Math.ceil(prod.price * prod.qty), 0);
}