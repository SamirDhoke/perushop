import React from 'react';
import { connect } from 'react-redux';
import { LogoutIcon } from '@heroicons/react/outline';

const LogoutButton = props => {

	const handleLogout = () => {
		window.localStorage.removeItem("user");
		props.logoutUser();
	};

	return (
		<button onClick={handleLogout}>
			<LogoutIcon 
				className="text-gray-900 h-4 w-4 cursor-pointer"										
			/>
		</button>
	);
}

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch({ type: 'user/logoutUser' })
});

export default connect(null, mapDispatchToProps)(LogoutButton);