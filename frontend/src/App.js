// packages
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// pages
import LandingPage from './pages/Landing';
import ProductPage from './pages/Product';
import CategoriesPage from './pages/categories';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/checkout';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import OrderPage from './pages/order';
import SearchResultPage from './pages/SearchResult';

// components
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Rating from './components/product/Rating'

import requireAuth from './hoc/requireAuth';

// tailwind styles
import './styles/styles.css';

const App = props => {
	
	const [isNavOpen, setIsNavOpen] = React.useState(false);

	React.useEffect(() => {
		const savedUserToken = window.localStorage.getItem("user");

		if (savedUserToken) {
			props.loginUser(JSON.parse(savedUserToken))
		}

	}, [])

	const toggleNav = e => setIsNavOpen(prev => !prev);

	return (
		<div className="max-w-6xl mx-auto relative"> 
			<Navbar isNavOpen={isNavOpen} toggleNav={toggleNav}/>

			<Switch>
				<Route path="/categories" component={CategoriesPage} />
				<Route path="/cart" render={(props) => <CartPage {...props}/>} />
				<Route path="/product/:id" render={(props) => <ProductPage {...props}/>} />
				<Route path="/checkout" component={CheckoutPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/signup" component={SignupPage}/>
				<Route path="/orders" component={requireAuth(OrderPage)}/>
				<Route path="/search" component={SearchResultPage}/>
				<Route path="/" component={LandingPage}/>

			</Switch>
									
			<Footer />

			<Navigation isNavOpen={isNavOpen} toggleNav={toggleNav}/>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	loginUser: (userToken) => dispatch({ type: "user/loginUser", payload: userToken })
})

export default connect(null, mapDispatchToProps)(App);