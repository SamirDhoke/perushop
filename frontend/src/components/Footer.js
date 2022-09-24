import React from 'react';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as RedditIcon } from '../assets/icons/reddit.svg';
import { ReactComponent as InstaIcon } from '../assets/icons/instagram.svg';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const footerData = [
	{
		title: "Categories",
		items: [			
			{
				title: "Domestic",
				link: "/categories/domestic"
			},
			{
				title: "Foreign",
				link: "/categories/foreign"
			}
		]
	},
	{
		title: "Legal",
		items: [
			{
				title: "Terms of service",
				link: "#"
			},
			{
				title: "Privacy policy",
				link: "#"
			},
			{
				title: "Return policy",
				link: "#"
			}		
		]
	},
	{
		title: "Company",
		items: [
			{
				title: "About",
				link: "#"
			},
			{
				title: "Faq",
				link: "#"
			},
			{
				title: "Contact",
				link: "#"
			}			
		]
	}
];

const DarkModeSwitch = props => {
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	React.useEffect(() => {
		if (isDarkMode && !document.body.classList.contains('dark')) {
			document.body.classList.add('dark')
		} else if (!isDarkMode && document.body.classList.contains('dark')) {
			document.body.classList.remove('dark')
		}
	}, [isDarkMode])

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	}

	return (
		<div className="inline-block relative border-2 rounded-full">			
			<div className="flex items-center" onClick={toggleDarkMode}>
				<div className={`z-20 p-2 ${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}><SunIcon className='h-4 w-4' /></div>
				<div className={`z-20 p-2 ${isDarkMode ? 'text-gray-50' : 'text-gray-900'}`}><MoonIcon className='h-4 w-4' /></div>
			</div>
			<span className={`z-10 absolute rounded-full w-1/2 bg-green-300 h-full top-0 left-0 transition-transform transform ${isDarkMode ? 'translate-x-full' : 'translate-x-0' }`}></span>
		</div>
	)
}

const Footer = props => {
	return (
		<div className="grid grid-cols-2 gap-12 sm:grid-cols-4 m-8 mt-32">
				
			<div className="text-center">
				
				<div className='brand flex items-center justify-center'>
					<div className="hidden sm:inline-block relative rounded-full w-6 h-6 bg-green-500 p-2 overflow-hidden">
						<h1 className="inline-block relative right-1 -top-1 text-xl font-bold text-white">P</h1>
					</div>
					<h1 className="text-md font-bold mx-2">Perushop</h1>
				</div>
				
				<p className="mt-4 text-sm">&copy; 2020 - All Rights Reserved</p>

				<div className="mt-4 space-x-3 flex justify-center">
					<FacebookIcon className="h-4 w-4"/>
					<TwitterIcon className="h-4 w-4"/>
					<RedditIcon className="h-4 w-4"/>
					<InstaIcon className="h-4 w-4"/>
				</div>

				<div className="mt-4 mx-8">
					<DarkModeSwitch />
				</div>
			</div>
				
			{
				footerData.map(item => (
					<div key={item.title} className="text-center">
						<h1 className="text-md font-bold">{item.title}</h1>
						<ul className="mt-4 space-y-3">
							{
								item.items.map(i => (
										<li key={i.title} className="text-sm">
											<Link to={i.link}>												
												{i.title}												
											</Link>
										</li>
									)
								)
							}
						</ul>
					</div>		
				))
			}

		</div>
	)
}

export default Footer;