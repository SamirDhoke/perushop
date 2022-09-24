import React from 'react';
import img from '../assets/guava.jpeg';
import { withRouter } from 'react-router-dom'

const HeroCard = props => {
	const {
		history
	} = props;

	return (
		<div className="relative sm:h-96 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 h-fit m-4">
			
			<div className="absolute inset-0 z-0 hidden sm:block">
				<img src={img} alt="hero image" className="w-full h-full object-cover object-left"/>
			</div>

			<div className="flex flex-col justify-center sm:p-6 mb-8 ">
				
				<div className='z-10'>
					<p className="text-sm italic text-blue-500"><small>Fresh Perus</small></p>
					<h1 className="text-3xl mt-2 font-bold lg:text-4xl">We deliver world's fresh Perus at your doorstep</h1>
					<button
						onClick={() => history.push('/categories/domestic')} 
						className="bg-green-400 text-white font-semibold text-md px-4 py-2 rounded-full mt-4"
					>Shop now</button>
				</div>
			</div>

			<div className="p-2 sm:hidden overflow-hidden">
				<img src={img} alt="hero image" className="aspect-square rounded-xl inline-block h-full w-full object-fit object-cover"/>
			</div>
		</div>
	)
}

export default withRouter(HeroCard);