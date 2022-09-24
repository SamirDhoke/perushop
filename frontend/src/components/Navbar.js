import React from 'react';
import { Link } from 'react-router-dom';
import {
	SearchIcon,
	UserIcon,
	MenuAlt4Icon,
	XIcon
} from '@heroicons/react/outline';
import { connect } from 'react-redux';

import UserMenu from './UserMenu';
import CartIcon from './CartIcon';
import { SearchTogglable } from './Search';

const Navbar = props => {
	const { isNavOpen, toggleNav, isLoggedIn } = props;

	const handleNavToggle = (e) => toggleNav();

	return (
		<header className="flex justify-between items-center p-6">
			
			<div className='brand flex items-center flex-1'>
				<div className="inline-block relative rounded-full w-8 h-8 bg-green-500 p-2 overflow-hidden">
					<h1 className="inline-block relative right-1 text-3xl font-bold text-white">P</h1>
				</div>
				<h1 className="text-xl font-bold mx-2">Perushop</h1>
			</div>

			<div className='flex justify-end flex-1 sm:justify-center'>
				<button 
					id="navButton"
					className="p-2 bg-green-100 rounded-full"					
					onClick={ handleNavToggle }
					>
				 	{
				 		isNavOpen
				 		? <XIcon id="navButton" className="w-4 h-4 text-gray-900"/>
				 		: <MenuAlt4Icon id="navButton" className="w-4 h-4 text-gray-900"/>						
				 	}									
				</button>
			</div>

			{/* Hidden when Mobile */}
			<div className="flex-1 hidden sm:block">
				<div className="outer-nav items-center hidden space-x-6 sm:flex sm:justify-end">
					
					<div className="flex-1">
						<SearchTogglable />
					</div>
					
					<div className="flex space-x-6 items-center">
						<Link to="/cart">
							<CartIcon />
						</Link>
						{
							isLoggedIn
							? (
								<UserMenu />
							):(								
								<Link to="/login">
									<UserIcon className="text-gray-900 h-4 w-4"/>
								</Link>
							)
						}						
					</div>

				</div>
			</div>
		</header>
	)
}

const mapStateToProps = state => ({
	isLoggedIn: !(!(state.user)),
	isNavOpen: state.nav
});

const mapDispatchToProps = (dispatch) => ({
	toggleNav: () => dispatch({ type: "nav/toggleNav" })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);