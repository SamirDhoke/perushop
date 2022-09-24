import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import authServices from '../services/authServices';

const initialState = {
	email: '',
	password: '',
	isRememberOn: false
};

const Login = props => {

	const { isLoggedIn, loginUser, history, location } = props;

	const [ userInfo, setUserInfo ] = React.useState(initialState);

	const { from } = location.state || { from: { pathname: "/" } };

	const handleLogin = e => {
		e.preventDefault();
		authServices
			.login( userInfo.email, userInfo.password )
			.then(data => {
				loginUser(data);
				if (userInfo.isRememberOn) {
					window.localStorage.setItem("user", JSON.stringify(data))
				}				
				setTimeout(() => history.replace(from), 500)
			})		
	}

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setUserInfo({
			...userInfo,
			[id]: value
		});
	}

	const handleRememberToggle = e => {
		setUserInfo({
			...userInfo,
			isRememberOn: !userInfo.isRememberOn
		});
	}


	if (isLoggedIn) {
		return <Redirect to={from.pathname} />
	}

	return (
		<div className="p-8">
			<p className="text-blue-500 text-sm"><small>Login</small></p>
			<h1 className="text-3xl mt-2 font-semibold">Login to your account</h1>
			
			<div className="w-full p-2 sm:w-1/2 mx-auto mt-8 sm:p-8">
				<form onSubmit={handleLogin}>
					<div className="">
						<label className="text-sm">Email Address</label>
						<input
							id="email"
							value={userInfo.email}
							onChange={handleInputChange}
							type="email"
							className="w-full px-4 py-2 border-2 rounded-full"								
						/>
					</div>
					<div className="mt-8">
						<label className="text-sm">Password</label>
						<input
							id="password"
							value={userInfo.password}
							onChange={handleInputChange}
							type="password"
							className="w-full px-4 py-2 border-2 rounded-full"								
						/>
					</div>
					<div className="mt-8 flex items-start">
						<input
							type="checkbox"
							checked={userInfo.isRememberOn}
							onChange={handleRememberToggle}
							className="h-4 w-4 mr-2"
						/>
						<label className="text-sm">Remember me</label>							
					</div>

					<button
						type="submit" 
						className="mt-8 px-4 py-2 w-full bg-green-400 text-white font-bold rounded-full"
					>
						Login
					</button>						
				</form>

				<div className="mt-8 flex-col sm:flex-row flex items-center gap-4">					
					
					<Link to="/signup" className="flex-1 px-4 py-2 w-full border-2 font-bold rounded-full text-center">
						Create Account
					</Link>
					
					<Link to="/signup" className="text-md underline">
						Forgot password?
					</Link>
					
				</div>
			</div>

		</div>
	)
}

const mapStateToProps = state => ({
	isLoggedIn: state.user != null
})

const mapDispatchToProps = dispatch => ({
	loginUser: (userData) => dispatch({ type: "user/loginUser", payload: userData }),
	logoutUser: () => dispatch({ type: "user/logoutUser" }),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));