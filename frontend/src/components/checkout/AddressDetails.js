import React from 'react';
import { connect } from 'react-redux';

const AddressDetails = props => {

	const { shippingAddress, setShippingAddress } = props;

	const handleSubmit = e => {
		e.preventDefault();

		const {
			house,
			street,
			city,
			country
		} = shippingAddress;

		if (!house || !street || !city || !country) {
			return console.error("All address details needs to be specified!");
		}

		props.next();
	}

	const handleInputChange = e => {
		const { id, value } = e.target;
	
		const updatedAddress = {
			...shippingAddress,
			[id]: value
		};

		setShippingAddress(updatedAddress);
	}

	return (
		<div className="mini-sign-in border-2 p-8 w-full rounded-xl">					
			<h1 className="text-2xl font-bold mt-2">Shipping Details</h1>
			
			<form onSubmit={ handleSubmit } className="mt-4">
				<div className="mt-4">
					<label className="text-xs text-gray-700 inline-block">Full name</label>
					<input
						id="fullName"
						value={shippingAddress.fullName}
						onChange={handleInputChange}
						type="text"
						className="border-2 block rounded-full py-1 w-full px-2"
					/>
				</div>

				<div className="mt-4">
					<label className="text-xs text-gray-700 inline-block">Street name</label>
					<input
						id="street"
						value={shippingAddress.street}
						onChange={handleInputChange}
						type="text"
						className="border-2 block rounded-full w-full py-1 px-2"
					/>
				</div>

				<div className="mt-4 flex space-x-4">				
					<div>
						<label className="text-xs text-gray-700 inline-block">House number</label>
						<input
							id="house"
							value={shippingAddress.house}
							onChange={handleInputChange}
							type="text"
							className="border-2 block rounded-full w-full py-1 px-2"
						/>
					</div>

					<div>
						<label className="text-xs text-gray-700 inline-block">City</label>
						<input
							id="city"
							value={shippingAddress.city}
							onChange={handleInputChange}
							type="text"
							className="border-2 block rounded-full w-full py-1 px-2"
						/>
					</div>
				</div>

				<div className="mt-4 flex space-x-4">				
					<div>
						<label className="text-xs text-gray-700 inline-block">Country</label>
						<input
							id="country"
							value={shippingAddress.country}
							onChange={handleInputChange}
							type="text"
							className="border-2 block rounded-full w-full py-1 px-2"
						/>
					</div>

					<div>
						<label className="text-xs text-gray-700 inline-block">Zip code</label>
						<input
							id="zip"
							value={shippingAddress.zip}
							onChange={handleInputChange}
							type="text"
							className="border-2 block rounded-full w-full py-1 px-2"
						/>
					</div>
				</div>

				<button 
					className="w-full bg-green-400 rounded-full text-white font-semibold text-sm mt-8 py-2"
					type='submit'					
				>
					Continue
				</button>				
			</form>
		</div>
	)
}

const mapStateToProps = state => {	
	return ({
		shippingAddress: state.checkout.data.shippingAddress,
	})
}

const mapDispatchToProps = dispatch => ({
	setShippingAddress: (address) => dispatch({ type: "checkout/setShippingAddress", payload: address })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);