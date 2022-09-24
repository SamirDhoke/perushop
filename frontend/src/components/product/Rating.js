import React from 'react';

import { StarIcon as StarOutlineIcon } from '@heroicons/react/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/solid'

const Rating = props => {
	const { score } = props;

	return (
		<div className="inline-block flex items-center">
			{
				Array(5).fill(0).map(( _, index ) => {
					if (index < score) {
						return (
							<span key={index}>
								<StarSolidIcon className="h-5 w-5 text-yellow-500" />
							</span>
						);
					}

					return (
						<span key={index}>
							<StarOutlineIcon className="h-4 w-4 text-yellow-500" />
						</span>
					);
				})
			}
		</div>
	)
}

export default Rating;