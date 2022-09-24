import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';

const UserMenu = props => {
	const { logoutUser, user } = props;

	const [open, setOpen] = React.useState(false);

	const parentRef = React.useRef(null);

	React.useEffect(() => {
		function handleOutsideClick(e) {			
			if (parentRef && parentRef.current && !parentRef.current.contains(e.target)) {
				setOpen(false);
				return;
			}
		}
		document.addEventListener('click', handleOutsideClick);

		return () => document.removeEventListener('click', handleOutsideClick);
	}, [])

	const handleOpenToggle = e => setOpen(prev => !prev);

	return (
		<div className="relative flex items-center" ref={parentRef}>
			<button onClick={handleOpenToggle}><UserCircleIcon className="h-4 w-4 text-gray-900"/></button>
			<ul 
				className="absolute top-10 right-0 z-40 bg-white border-2"
				style={{ display: open ? 'block' : 'none' }}
			>
				<li className="text-sm border-b-2 px-4 py-1">{user?.user}</li>
				<li className="text-sm border-b-2 px-4 py-1"><Link to="/orders">Orders</Link></li>
				<li className="text-sm text-red-500 px-4 py-1"><button onClick={logoutUser}>Logout</button></li>
			</ul>
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch({ type: 'user/logoutUser' })
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);