import React from 'react';
import SubMenu from './SubMenu';

export const data = [
	{
		title: "Home",
		to: "/home"
	},
	{
		title: "Categories",
		submenu: [
			{
				title: "Domestic",
				to: "/categories/domestic"
			},			
			{
				title: "Foreign",
				to: "/categories/foreign"
			},
		]
	},
	{
		title: "About",
		to: "/about"
	},
	{
		title: "Contact",
		to: "/contact"
	}
];

const Menu = props => {

	return (
		<div className="w-full max-h-64 sm:h-56 flex justify-center overflow-y-scroll">
			<ul>
				{data.map(menu => <SubMenu key={menu.title} menu={menu}/>)}
			</ul>
		</div>
	);
}

export default Menu;