import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import authServices from '../services/authServices';

const initialState = {
	username: '',
	email: '',
	password: '',
	isTermsAccepted: false
};

const Signup = props => {

	const { isLoggedIn, history } = props;

	const [ userInfo, setUserInfo ] = React.useState(initialState);

	const validateUsername = username => {
		return username.length >= 8;
	}

	const validateEmail = email => {
		let res = true;
		
		if (!email.includes('@')) {
			res = false;
		}

		if (!email.includes('.')) {
			res = false;
		}		

		return res;
	}

	const validatePassword = pass => {
		return pass.length >= 8;	
	}

	const handleSignup = (e) => {
		e.preventDefault();
		
		if (!validateUsername(userInfo.username) || !validateEmail(userInfo.email) || !validatePassword(userInfo.password)) {
			console.error('Validation failed !');
			return;
		}

		authServices
			.signup({
				username: userInfo.username,
				password: userInfo.password,
				email: userInfo.email				
			})
			.then(data => {
				setUserInfo(initialState);
				history.push('/login');
			})
			.catch(e => console.error(e));		
	}

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setUserInfo({
			...userInfo,
			[id]: value
		});
	}

	const handleTermsToggle = e => {
		setUserInfo({
			...userInfo,
			isTermsAccepted: !userInfo.isTermsAccepted
		});
	}

	if (isLoggedIn) {
		return <Redirect to='/' />
	}

	return (
		<div className="p-8">
			<p className="text-blue-500 text-sm"><small>Signup</small></p>
			<h1 className="text-3xl mt-2 font-semibold">Create account</h1>
			
			<div className="w-full p-2 sm:w-1/2 mx-auto mt-8 sm:p-8">
				<form onSubmit={handleSignup}>
					
					<div className="">
						<label className="text-sm">Email address</label>
						<input
							id="email"
							type="email"
							value={userInfo.email}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border-2 rounded-full"								
						/>
					</div>

					<div className="mt-8">
						<label className="text-sm">Username</label>
						<input
							id="username"
							value={userInfo.username}
							onChange={handleInputChange}
							type="text"
							className="w-full px-4 py-2 border-2 rounded-full"								
						/>
					</div>
					<div className="mt-8">
						<label className="text-sm">Create Password</label>
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
							checked={userInfo.isTermsAccepted}
							onChange={handleTermsToggle}
							className="h-4 w-4 mr-2"
						/>
						<label className="text-sm">I have read and agree to the <span className="underline font-semibold">terms and conditions</span></label>							
					</div>

					<div className="mt-8 flex-col sm:flex-row flex items-center gap-4">
						<button
							disabled={!userInfo.isTermsAccepted}
							className="flex-1 px-4 py-2 w-full bg-green-500 text-white font-bold rounded-full disabled:bg-green-300"
							type="submit"
						>
							Create Account
						</button>
						<Link 
							className="text-center flex-1 px-4 py-2 w-full border-2 font-bold rounded-full"
							to="/login"
							>
							Login							
						</Link>
					</div>						
				</form>				
			</div>

		</div>
	)
}

const mapStateToProps = state => ({
	isLoggedIn: state.user != null
});

export default connect(mapStateToProps)(withRouter(Signup));