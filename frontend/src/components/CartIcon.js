import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { selectItemsCount } from '../redux/cart/selectors';

const CartIcon = props => {
	const { itemsCount } = props;

	return (
		<span className="relative">
			<ShoppingCartIcon className="text-gray-900 h-4 w-4"/>
			<span className="absolute px-1 text-xs rounded-full bg-green-300 -right-6 -bottom-2">{itemsCount}</span>
		</span>
	);
}

const mapStateToProps = state => ({
	itemsCount: selectItemsCount(state)
})

export default connect(mapStateToProps)(CartIcon);