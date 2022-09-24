const router = require('express').Router();
const Order = require('../models/order');
const { validateAuth, validateAdmin, validateUser } = require('../middleware/auth');
const { logger } = require('../utils');

const { STRIPE_SECRET, STRIPE_PK } = require('../config');

const stripe = require('stripe')(STRIPE_SECRET);

router.get('/get_publishable_key', (req, res, next) => {
	res.json({ key: STRIPE_PK })
})

router.post('/create-payment-intent', validateAuth, validateUser, (req, res, next) => {
	const data = req.body;
	const user = req.user;

	const { order } = data;
	
	const total = (order.shipment.charges + order.billing.charges) * 100;

	stripe.paymentIntents.create({
		amount: total,
		currency: 'inr',
		payment_method_types: ['card']
	})
	.then(intent => {
		res.status(201).json({ 
			id: intent.id, 
			secret: intent.client_secret, 
			amount: intent.amount 
		})
	})
	.catch(e => next({ status: 500, message: e.message }))
})

module.exports = router;