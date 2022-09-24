import React from 'react';
import CategoryProducts from './CategoryProducts';

import {
	Route,
	Switch
} from 'react-router-dom';

const Categories = props => {
	return (
		<div>
			<Switch>
				<Route path='/categories/:category' component={CategoryProducts} />
			</Switch>
		</div>
	)
}

export default Categories;