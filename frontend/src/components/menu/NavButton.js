import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = props => {
	const { path, children } = props;

	const handleClick = location => {	
		return (
			{...location, pathname: path}
		) 
	}

	return (
		<Link to={ handleClick }>
			{ children }
		</Link>
	)
}

export default NavButton;