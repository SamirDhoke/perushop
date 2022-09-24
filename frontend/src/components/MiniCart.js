import { MiniProduct } from './product';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const MiniCart = props => {

	const { cart, deleteItemFromCart } = props;

	const handleEditCart = () => props.history.push('/cart')

	return (
		<div className="mini-cart w-full border-2 rounded-xl p-8">
					
			<h1 className="text-2xl font-semibold">My Cart</h1>
			
			<div className="products space-y-4 mt-8">
				{
					cart.items.map((product) => (
							<MiniProduct
								key={product.id}
								product={product}
								deleteItemFromCart={deleteItemFromCart}
							/>
						)
					)
				}
			</div>

			<div className="text-xl flex justify-between mt-8 font-bold">
				<span>Total:</span>
				<span>₹{cart.stats.total}</span>
			</div>

			<button 
				className="w-full mt-8 font-bold text-sm border-2 px-4 py-2 rounded-full"
				onClick={handleEditCart}
			>
				Edit Cart
			</button>
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart
})

const mapDispatchToProps = dispatch => ({
	deleteItemFromCart: (item) => dispatch({ type: "cart/deleteItem", payload: item })
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MiniCart));