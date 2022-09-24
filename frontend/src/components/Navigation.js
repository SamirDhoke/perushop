import React from 'react';

import {
	ShoppingCartIcon,
	UserIcon
} from '@heroicons/react/outline';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as RedditIcon } from '../assets/icons/reddit.svg';
import { ReactComponent as InstaIcon } from '../assets/icons/instagram.svg';

import CartIcon from './CartIcon';
import LogoutButton from './LogoutButton';
import Menu from './menu';

import { SearchStatic } from './Search';

const Navigation = props => {

	if (!props.isNavOpen) {
		return null;
	}

	const { isLoggedIn } = props;

	return (
		<div className="navigation absolute top-20 w-full p-6 bg-white dark:bg-gray-900 z-20">

			{/* Hidden when desktop */}
			<div className="outer-nav mb-8 flex justify-center items-center space-x-6 sm:hidden">
				<SearchStatic />
			</div>

			<div className="flex justify-center">
				<Menu className="flex flex-col space-y-3 text-center sm:flex-row"/>
			</div>

			{/* Hidden when desktop */}
			<div className="outer-nav mt-8 flex justify-center items-center space-x-6 text-gray-900 dark:text-gray-50 sm:hidden">
				<Link to="/cart">
					<CartIcon />
				</Link>
				{
					isLoggedIn
					? (
						<LogoutButton />						
					):(								
						<Link to="/login">
							<UserIcon className="h-4 w-4"/>
						</Link>
					)
				}				
			</div>

			<div className="space-x-3 hidden fill-black dark:fill-white sm:flex">
				<FacebookIcon className="h-4 w-4"/>
				<TwitterIcon className="h-4 w-4"/>
				<RedditIcon className="h-4 w-4"/>
				<InstaIcon className="h-4 w-4"/>
			</div>

		</div>
	)
}

const mapStateToProps = state => ({
	isLoggedIn: !(!(state.user)),
	isNavOpen: state.nav
});

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch({ type: 'user/logoutUser' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);