const { Schema, model } = require('mongoose');
const { transformSchema } = require('../utils');

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: Number,
	images: [{
		type: String
	}],
	stock: {
		type: Number,
		default: 0
	},
	discount: {
		type: Number,
		default: 0
	},
	category: {
		type: String,
		default: ''
	}
});

productSchema.set('toJSON', {
	transform: transformSchema
});

const Product = model('Product', productSchema);

module.exports = Product;