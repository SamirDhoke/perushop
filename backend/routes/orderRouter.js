const router = require('express').Router();
const Order = require('../models/order');
const { validateAuth, validateAdmin, validateUser } = require('../middleware/auth');
const { logger } = require('../utils');

router.get('/all', validateAuth, validateAdmin, (req, res, next) => {
	Order
		.find({})
		.then(orders => res.json(orders));
})

router.get('/', validateAuth, validateUser, (req, res, next) => {
	const user = req.user;

	Order
		.find({ orderedBy: user._id })
		.populate({
			path: 'products',
			populate: {
				path: 'product'
			}
		})
		.populate({
			path: 'orderedBy',
			select: ['email', 'username', 'name']
		})
		.then(data => res.json(data))
		.catch(e => next({ status: 500, message: e.message }));
})

router.post('/', validateAuth, validateUser, async (req, res, next) => {
	const body = req.body;
	const user = req.user;

	try {
		const newOrder = new Order({
			...body,
			orderedBy: user._id
		});

		const savedOrder = await newOrder.save();

		res.status(201).json(savedOrder);
	} catch (e) {
		console.log(e);
		next({ status: e.status || 500, message: e.message });
	}
})

router.put('/:id', validateAuth, validateAdmin, async (req, res, next) => {
	const body = req.body;
	const user = req.user;
	const orderId = req.params.id;

	try {
		const order = await Order.findById(orderId);
		
		if (!order) {
			throw {
				status: 404,
				message: 'not found'
			}
		}

		const updates = {
			payment: {
				paymentStatus: body.paymentStatus || order.payment.paymentStatus	
			},
			status: body.status || order.status,
		}

		const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
		
		res.status(200).json(updatedOrder);

	} catch (e) {
		next({ status: e.status || 500, message: e.message });
	}
})

router.get('/:id', validateAuth, validateUser, async (req, res, next) => {
	const body = req.body;
	const user = req.user;
	const orderId = req.params.id;

	try {
		const order = await Order
			.findById(orderId)
			.populate({
				path: 'products',
				populate: {
					path: 'product'
				}
			})
			.populate({
				path: 'orderedBy',
				select: ['email', 'username', 'name']
			});
		
		if (!order) {
			throw {
				status: 404,
				message: 'not found'
			}
		}

		if (!order.orderedBy.equals(user._id)) {
			throw {
				status: 401,
				message: 'unauthorized access to resource'
			}
		}

		res.status(200).json(order);

	} catch (e) {
		next({ status: e.status || 500, message: e.message });
	}
})

module.exports = router;