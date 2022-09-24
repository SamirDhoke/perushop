import React from 'react';
import { connect } from 'react-redux';

import authServices from '../../services/authServices';

const initialState = {
	email: '',
	password: ''
};

const MiniSignIn = props => {

	const { loginUser } = props;

	const [ userInfo, setUserInfo ] = React.useState(initialState);

	const handleLogin = e => {
		e.preventDefault();
		authServices
			.login( userInfo.email, userInfo.password )
			.then(data => {
				loginUser(data);
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

	return (
		<div className="mini-sign-in border-2 p-8 w-full rounded-xl">					
			<h1 className="text-2xl font-bold mt-2">Details</h1>
			
			<form onSubmit={handleLogin} className="mt-4">
				<div className="mt-4">
					<label className="text-xs text-gray-700 inline-block">Email address</label>
					<input
						type="email"
						id="email"
						value={userInfo.email}
						onChange={handleInputChange}
						className="email border-2 block rounded-full py-1 w-full px-2"
					/>
				</div>

				<div className="mt-4">
					<label className="text-xs text-gray-700 inline-block">Password</label>
					<input
						type="password"
						id="password"
						value={userInfo.password}
						onChange={handleInputChange}
						className="email border-2 block rounded-full w-full py-1 px-2"
					/>
				</div>

				<button 
					className="w-full bg-green-400 rounded-full text-white font-semibold text-sm mt-8 py-2"
					type='submit'
					onClick={props.next}
				>
					Continue
				</button>				
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	loginUser: (userData) => dispatch({ type: "user/loginUser", payload: userData })
})

export default connect(null, mapDispatchToProps)(MiniSignIn)