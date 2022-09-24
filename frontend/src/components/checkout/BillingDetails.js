import React from 'react';
import { connect } from 'react-redux';

const AddressForm = props => {
	const { address, handleInputChange, handleSubmit } = props;

	return (
		<form onSubmit={ handleSubmit } className="mt-4">
			<div className="mt-4">
				<label className="text-xs text-gray-700 inline-block">Full name</label>
				<input
					id="fullName"
					value={address.fullName}
					onChange={handleInputChange}
					type="text"
					className="border-2 block rounded-full py-1 w-full px-2"
				/>
			</div>

			<div className="mt-4">
				<label className="text-xs text-gray-700 inline-block">Street name</label>
				<input
					id="street"
					value={address.street}
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
						value={address.house}
						onChange={handleInputChange}
						type="text"
						className="border-2 block rounded-full w-full py-1 px-2"
					/>
				</div>

				<div>
					<label className="text-xs text-gray-700 inline-block">City</label>
					<input
						id="city"
						value={address.city}
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
						value={address.country}
						onChange={handleInputChange}
						type="text"
						className="border-2 block rounded-full w-full py-1 px-2"
					/>
				</div>

				<div>
					<label className="text-xs text-gray-700 inline-block">Zip code</label>
					<input
						id="zip"
						value={address.zip}
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
	)
}

const BillingDetails = props => {

	const { 
		isBillingShippingSame, 
		billingAddress, 
		setBillingAddress,
		toggleBillingShippingSame
	} = props;

	const handleSameAddressToggle = e => {
		toggleBillingShippingSame();
	}

	const handleSubmit = e => {
		e.preventDefault();

		const {
			house,
			street,
			city,
			country
		} = billingAddress;

		if (!house || !street || !city || !country) {
			return console.error("All address details needs to be specified!");
		}

		props.next();
	}

	const handleInputChange = e => {
		const { id, value } = e.target;		

		const updatedAddress = {
			...billingAddress,
			[id]: value
		};

		setBillingAddress(updatedAddress);
	}

	return (
		<div className="mini-sign-in border-2 p-8 w-full rounded-xl">					
			<h1 className="text-2xl font-bold mt-2">Billing details</h1>

			<div className="mt-4 flex items-start">
				<input
					type="checkbox"
					checked={isBillingShippingSame}
					onChange={handleSameAddressToggle}
					className="p-2 mr-2 rounded-full h-4 w-4"
				/>
				<label className="text-sm text-gray-700 inline-block">Same as shipping address</label>					
			</div>

			{
				isBillingShippingSame
				? <button 
						className="w-full bg-green-400 rounded-full text-white font-semibold text-sm mt-8 py-2"
						onClick={() => props.next()}				
					>
						Continue
					</button>
				: <AddressForm 
						address={billingAddress}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
					/>
			}

		</div>
	)
}

const mapStateToProps = state => {	
	return ({
		billingAddress: state.checkout.data.billingAddress,
		isBillingShippingSame: state.checkout.data.isBillingShippingSame
	})
}

const mapDispatchToProps = dispatch => ({
	setBillingAddress: (address) => dispatch({ type: "checkout/setBillingAddress", payload: address }),
	toggleBillingShippingSame: () => dispatch({ type: "checkout/toggleBillingShippingSame" })
})

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetails);