import React from 'react';

const Step = props => {
	const { isPassed } = props;

	return (
		<span 
			className={`inline-block aspect-square w-4 ${ isPassed ? 'bg-green-400' : 'bg-gray-200' } rounded-full`}
			/>
	)
}

const Stepper = props => {
	const {
		curStep,
		totalSteps
	} = props;

	return (
		<div className="flex w-full">
			{
				Array(totalSteps).fill(0).map((_, index) => {
					if (index + 1 < totalSteps) {
						return (
							<div key={index + 1} className='step flex-1 flex items-center'>
								<Step isPassed={curStep >= index + 1} />
								<span className={`inline-block h-1 w-full ${ curStep >= index + 1 ? 'bg-green-400' : 'bg-gray-200' } mx-1`}/>								
							</div>
						)
					} else {
						return (
							<div key={index + 1} className='step flex items-center'>
								<Step isPassed={curStep >= index + 1} />
							</div>
						)
					}
				})
			}
		</div>		
	)
}

export default Stepper