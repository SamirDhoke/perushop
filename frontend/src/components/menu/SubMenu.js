import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/outline';

import Dropdown from './Dropdown'
import NavButton from './NavButton';

const SubMenu = props => {
	const { menu } = props;
	const [dropdown, setDropdown] = React.useState(false);

	const ref = React.useRef();

	React.useEffect(() => {
		const handler = (e) => {
			if (ref && ref.current && !(ref.current.contains(e.target))) {
				setDropdown(false);
			}
		}

		const keypresshandler = e => {
			if (e.code === 'Space') {
				if (ref && ref.current && !(ref.current.contains(e.target))) {
					setDropdown(false);
				}		
			}
		}

		window.addEventListener('mousedown', handler);
		window.addEventListener('keyup', keypresshandler);

		return () => {
			window.removeEventListener('mousedown', handler);
			window.removeEventListener('keyup', keypresshandler);
		}

	}, []);

	if (menu.submenu) {
		return (
			<li ref={ref} className="p-2 relative flex flex-col justify-center">
				<button 
					onClick={() => setDropdown(!dropdown)} 
					className={`text-left text-gary-900 dark:text-gray-50 sm:text-center hover:text-green-400 ${dropdown ? 'text-green-500' : ''}`}
				>
					{ menu.title }
					<ChevronRightIcon className="inline h-4 w-4"/>
				</button>
				<Dropdown submenu={menu.submenu} open={dropdown} />
			</li>
		)
	}

	return (
		<li className="p-2 text-gary-900 dark:text-gray-50 flex justify-left sm:justify-center hover:text-green-400 cursor-pointer">
			<NavButton path={menu.to}>
				{ menu.title }
			</NavButton>
		</li>
	)
}

export default SubMenu