import React from 'react';
import Stepper from './Stepper';

const Step = props => {
	const { isPassed } = props;

	return (
		<span 
			className={`inline-block aspect-square w-4 ${ isPassed ? 'bg-green-400' : 'bg-gray-200' } rounded-full`}
			/>
	)
}

const StepperVertical = props => {
	const {
		curStep,
		totalSteps
	} = props;

	return (
		<div className="flex flex-col w-full space-y-1">
			{
				Array(totalSteps).fill(0).map((_, index) => {
					if (index + 1 < totalSteps) {
						return (
							<div key={index + 1} className="flex items-start">
								<div className="flex flex-col items-center">
									<Step isPassed={curStep >= index + 1} />
									<span className={`inline-block h-4 w-1 ${ curStep >= index + 1 ? 'bg-green-400' : 'bg-gray-200' } mt-1`}/>
								</div>								
							</div>
						)
					} else {
						return (
							<div key={index + 1}>
								<Step isPassed={curStep >= index + 1} />
							</div>
						)
					}
				})
			}
		</div>		
	)
}

const OrderStatus = props => {
	const { curStep=4 } = props;

	return (
		<div className="border-2 rounded-xl p-4">
			<h1 className="text-sm font-bold">Order Status</h1>

			<div className="flex items-center gap-4 sm:flex-col sm:items-start">
				<div className="px-4 mt-2 block sm:hidden">
					<StepperVertical curStep={curStep} totalSteps={5} />
				</div>
				<div className="mt-2 w-1/2 hidden sm:block">
					<Stepper curStep={curStep} totalSteps={5} />
				</div>
				<div className="px-1">
					{ 
						curStep === 1 && (
							<div>
								<h1 className="text-2xl font-bold">Ordered</h1>
								<p>Lorem ipsum laborum eiusmod dolor aute et duis enim consectetur culpa dolore ad do in incididunt pariatur dolor in reprehenderit.</p>
							</div>
						)
					}
					{ 
						curStep === 2 && (
							<div>
								<h1 className="text-2xl font-bold">Dispatched</h1>
								<p>Lorem ipsum laborum eiusmod dolor aute et duis enim consectetur culpa dolore ad do in incididunt pariatur dolor in reprehenderit.</p>
							</div>
						)
					}
					{ 
						curStep === 3 && (
							<div>
								<h1 className="text-2xl font-bold">Shipped</h1>
								<p>Lorem ipsum laborum eiusmod dolor aute et duis enim consectetur culpa dolore ad do in incididunt pariatur dolor in reprehenderit.</p>
							</div>
						)
					}
					{ 
						curStep === 4 && (
							<div>
								<h1 className="text-2xl font-bold">Out For Delivery</h1>
								<p>Lorem ipsum laborum eiusmod dolor aute et duis enim consectetur culpa dolore ad do in incididunt pariatur dolor in reprehenderit.</p>
							</div>
						)
					}
					{ 
						curStep === 5 && (
							<div>
								<h1 className="text-2xl font-bold">Delivered</h1>
								<p>Lorem ipsum laborum eiusmod dolor aute et duis enim consectetur culpa dolore ad do in incididunt pariatur dolor in reprehenderit.</p>
							</div>
						)
					}
				</div>
			</div>

		</div>
	);
}

export default OrderStatus;