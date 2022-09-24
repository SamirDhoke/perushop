import { combineReducers } from 'redux';

import cartReducer from './cart';
import categoriesReducer from './categories';
import userReducer from './user';
import navReducer from './navigation';
import productReducer from './product';
import checkoutReducer from './checkout';

const rootReducer = combineReducers({
	cart: cartReducer,
	categories: categoriesReducer,
	user: userReducer,
	nav: navReducer,
	product: productReducer,
	checkout: checkoutReducer
});

export default rootReducer;