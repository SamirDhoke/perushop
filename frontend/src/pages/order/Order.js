import React from 'react';
import { connect } from 'react-redux';

import CartTotal from '../../components/CartTotal';
import OrderStatus from '../../components/OrderStatus';
import { ProductCard } from './Orders';

import orderServices from '../../services/orderServices';

const ORDER_STATUS_MAP = {
	'ORDERED': 1,
	'DISPATCHED': 2,
	'SHIPPED': 3,
	'OFD': 4,
	'DELIVERED': 5
}

const Order = props => {

	const { match, location, user } = props;

	const [order, setOrder] = React.useState(null);	

	React.useEffect(() => {
		
		const orderId = match.params.id;

		orderServices
			.getOrder(orderId, user.auth)
			.then(data => setOrder(data))
			.catch(e => console.error(e));
	
	}, []);

	const {
		date,
		id,
		shipment,
		billing,
		products,
		payment
	} = order || {};

	return (
		<div className="p-8">
			<p className="text-xs italic text-blue-500">Order</p>
			<h1 className="font-bold text-3xl mt-2">Order details</h1>

			<div className='mt-8 flex relative justify-start gap-2 text-xs'>
				<span>Ordered on {date}</span>								
				<span className="border-l-2 border-gray-400 pl-2">Order ID {id}</span>
			</div>

			<div className='mt-2 order-info grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border-2 rounded-xl'>
				
				<div className="shipping flex flex-col items-left gap-2">
					<h1 className="text-sm font-bold">Shipping address</h1>
					<div className="text-xs">
						<p>{shipment?.address?.fullName}</p>
						<p>{shipment?.address?.house}</p>
						<p>{shipment?.address?.street}</p>
						<p>{shipment?.address?.landmark}</p>
						<p>{shipment?.address?.city}</p>
						<p>{shipment?.address?.country}</p>
						<p>{shipment?.address?.zip}</p>
					</div>
				</div>

				<div className="payment flex flex-col items-left gap-2">
					<h1 className="text-sm font-bold">Payment info</h1>
					<div className="text-xs">
						{
							payment?.paymentType === 'OFFLINE'
							? <p>Pay on delivery (cash/card)</p>
							: <p>Online payment ({ payment?.paymentStatus?.toLowerCase() })</p>
						}
					</div>
				</div>

				<div className="summary flex flex-col items-left gap-2">
					<h1 className="text-sm font-bold">Order summary</h1>
					
					<div className="text-xs">
						<CartTotal 
							stats={{
								subtotal: billing?.charges,
								tax: 0,								
								shipping: shipment?.charges
							}}
						/>
					</div>
				</div>

			</div>

			<div className="my-4">
				<OrderStatus curStep={ ORDER_STATUS_MAP[order?.status || 1] }/>
			</div>

			<div className="items mt-2 border-2 rounded-xl">
				<div className="header px-4 py-2 bg-gray-100">
					<span className="font-bold">{products?.length || 0} Items</span>
				</div>
				<div className="item-list">
					{
						products?.map(
							({ qty, product }) => (
								<div className="border-b" key={product.id}>
									<ProductCard
										product={{
											...product,
											orderedOn: date,
											qty
										}}
									/>
								</div>
							)
						)
					}
				</div>
			</div>

		</div>
	)
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps)(Order);