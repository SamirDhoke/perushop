import React from 'react';
import SubMenu from './SubMenu';

const Dropdown = props => {
	const {submenu, open} = props;

	if (!open) {
		return null
	}

	return (
		<ul className="relative sm:absolute top-0 left-1 sm:left-full mx-2">
			{submenu.map(menu => <SubMenu key={menu.title} menu={menu} />)}
		</ul>
	)
}

export default Dropdown