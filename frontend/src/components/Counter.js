import React from 'react';
import {
	ChevronRightIcon,
	ChevronLeftIcon
} from '@heroicons/react/outline';

const Counter = props => {
	const {
		count=0,
		onDecr,
		onIncr
	} = props;

	const handleCountIncr = e => onIncr();
	const handleCountDecr = e => onDecr();

	return (
		<div className="flex w-fit px-2 items-center space-x-4 rounded-full border-2">
			<button onClick={handleCountDecr}><ChevronLeftIcon className="h-4 w-4 text-gray-900 cursor-pointer" /></button>
			<span className="font-bold">{count}</span>
			<button onClick={handleCountIncr}><ChevronRightIcon className="h-4 w-4 text-gray-900 cursor-pointer" /></button>			
		</div>
	)
}

export default Counter;