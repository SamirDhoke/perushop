import React from 'react';

export const ImageCarousalMobile = props => {
	const { images, discount } = props;

	return (
		<div className="sm:hidden p-2 col-span-2 relative">
			<div className="p-2">
				<img 
					src={images[0]} 
					alt='product'
					className="rounded-xl aspect-square w-full"
				/>
			</div>
			{
				discount 
				? (
					<span 
						className="absolute font-semibold top-5 -right-0 rounded-full text-sm px-2 py-1 bg-red-500 text-white"
					>{Math.floor(discount * 100)}% OFF</span>
				)
				: null
			}
		</div>
	);
}

const ImageCarousal = props => {
	const { images, discount } = props;

	return (
		
		<div className="hidden sm:flex h-full">
				
				<div className="">
					{
						images
							.map( (imgUrl, index) => (
								<div className="p-4" key={index + 1}>
									<img
										src={imgUrl} 
										alt="detail image" 
										className="rounded-md aspect-square sm:w-12 md:w-16 lg:w-20"
										/>									
								</div>
							) 
						)
					}
				</div>

				<div className="relative flex-1">
					<div className="p-4">
						<img 
							src={images[0]} 
							alt="detail image" 
							className="rounded-2xl aspect-square w-full "
							/>
					</div>
					{
						discount
						? (
							<span 
								className="font-semibold absolute top-8 -right-2 rounded-full text-sm px-2 py-1 bg-red-500 text-white"
							>{Math.floor(discount * 100)}% OFF</span>
						)
						: null
						
					}
				</div>
				
		</div>
	);
}

export default ImageCarousal;