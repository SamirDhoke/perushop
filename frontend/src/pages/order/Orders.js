import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { XIcon, ChevronRightIcon } from '@heroicons/react/outline'
import orderServices from '../../services/orderServices';

const HeaderItem = props => {
	const {
		title,
		value
	} = props;

	return (
		<div className="header-item flex flex-col text-xs space-y-1">
			<span className="uppercase">{title}</span>
			<span>{value}</span>
		</div>
	);
}

export const ProductCard = props => {
	const { product } = props;
	const {
		images,
		name,
		qty,
		orderedOn="28-JAN-2022"
	} = product;

	return (
		<div 
			className="flex items-start"
		>			
			<div className="p-4">
				<img 
					src={images[0]} 
					alt='product'
					className="rounded-xl min-w-14 w-28 aspect-square"
				/>
			</div>
			
			<div className="flex-1 py-4 flex flex-col gap-3 mx-4">
				<div className="flex flex-col">
					<h1 className="font-semibold text-md sm:text-xl">{name}</h1>
					<span className="inline-block text-sm sm:hidden">Ordered on {orderedOn}</span>
					<div className="hidden sm:flex items-center">
						<XIcon className="h-4 w-4 text-gray-900"/>
						<span>{qty}</span>
					</div>
				</div>

				<button className="w-fit px-4 py-2 text-white bg-green-400 rounded-full text-xs font-semibold">
					Buy again
				</button>
			</div>

			<div className="flex sm:hidden self-center mx-2">
				<ChevronRightIcon
				 className="h-4 w-4 text-gray-900"
			 	/>
			</div>

		</div>
	)
}

const ORDERS = [
	{
		orderId: 12345678910,
		orderedOn: "28 january 2022",
		orderTotal: 200,
		orderedBy: {
			name: 'john doe'
		},
		items: [
			{
				id: 1,
				title: "roasted beans",
				qty: 3
			},
			{
				id: 2,
				title: "manchurian knife",
				qty: 2
			}
		]
	},

	{
		orderId: 12345678911,
		orderedOn: "28 january 2022",
		orderTotal: 140,
		orderedBy: {
			name: 'john doe'
		},
		items: [
			{
				id: 1,
				title: "flava beans",
				qty: 10
			},
			{
				id: 2,
				title: "comodo lizard skin",
				qty: 1
			}
		]
	}
]

const OrderMini = props => {
	const {
		order,
		history
	} = props;

	const {
		id,
		date,
		billing,
		orderedBy,
		products		
	} = order;


	const handleViewOrderDetails = e => {
		history.push(`/orders/${id}`);
	}

	return (
		<div className="order-mini border-2 rounded-xl overflow-hidden">
			
			<div className="header hidden sm:flex space-x-12 bg-gray-100 p-4">
				<HeaderItem
					title="order placed"
					value={date}
				/>
				<HeaderItem
					title="total"
					value={billing.charges}
				/>
				<HeaderItem
					title="Ship to"
					value={orderedBy.username}
				/>
				<div className="flex-1 flex justify-end">
					<div className="flex flex-col items-end text-xs space-y-1">
						<span>ORDER ID {id}</span>
						<button 
							className="w-fit text-green-500 font-semibold"
							onClick={handleViewOrderDetails}
						>
							Order details
						</button>
					</div>
				</div>
			</div>

			<div className="items">
				{
					products.map(
						({ qty, product }) => (
							<div className="border-b" key={product.id}>
								<ProductCard
									product={{
										...product,
										qty
									}}
								/>
							</div>			
						)
					)
				}				
			</div>
			
		</div>
	)
}

const Orders = props => {
	
	const { user, history } = props;

	const [orders, setOrders] = React.useState([]); 

	React.useEffect(() => {
		orderServices
			.getOrders(user.auth)
			.then(data => setOrders(data))
			.catch(e => console.error(e));
	}, [])

	return (
		<div className="p-8">
			<p className="text-xs italic text-blue-500">Order</p>
			<h1 className="font-bold text-3xl mt-2">Your orders</h1>

			<div className="mt-8 flex flex-col gap-4 orders">
				{
					orders.map(
						order => (
							<OrderMini order={order} key={order.id} history={history}/>
						)
					)					
				}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps)(Orders);