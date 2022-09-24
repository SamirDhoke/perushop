import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const requireAuth = (Component) => {

	const Authenticated = props => {
		
		const { user, isAuthenticated, location, ...rest } = props;

		if (!isAuthenticated) {
			return <Redirect to={{
        pathname: "/login",
        state: { from: location }
      }}/>
		}

		return <Component {...rest} />
	}

	const mapStateToProps = state => ({
		user: state.user,
		isAuthenticated: !!(state.user && state.user.auth)
	})

	return connect(mapStateToProps)(Authenticated);
}

export default requireAuth;