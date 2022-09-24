const { Schema, model } = require('mongoose');
const { transformSchema } = require('../utils');
const addressSchema = require('./address');

const orderSchema = new Schema({
	date: {
		type: Date,
		default: new Date()
	},
	products: [{
		qty: Number,
		product: {
			type: Schema.Types.ObjectID,
			ref: 'Product'
		}
	}],
	status: {
		type: String,
		enum: ['SHIPPED', 'DISPATCHED', 'ORDERED'],
		default: 'ORDERED'
	},
	shipment: {
		...addressSchema,
		charges: {
			type: Number,
			default: 0
		}
	},
	billing: {
		...addressSchema,
		charges: {
			type: Number,
			default: 0
		}
	},
	payment: {
		paymentType: { 
			type: String,
			enum: ['ONLINE', 'OFFLINE'],
			required: true 
		},
		paymentStatus: {
			type: String,
			enum: ['PAID', 'UNPAID'],
			default: 'UNPAID'
		}
	},
	orderedBy: {
		type: Schema.Types.ObjectID,
		ref: 'NormalUser'
	}
})

orderSchema.set('toJSON', {
	transform: transformSchema
});

const Order = model('Order', orderSchema);

module.exports = Order;