import React from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';
import Orders from './Orders';
import Order from './Order';

const OrderPage = props => {
	const { match } = props;

	return (
		<div>
			<Switch>								
				<Route path={`${match.path}/:id`} component={Order} />
				<Route exact path={`${match.path}/`} component={Orders} />
			</Switch>
		</div>
	)
}

export default OrderPage;