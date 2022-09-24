// const { Schema } = require('mongoose');

module.exports = {
	address: {
		fullName: {
			type: String,
			default: ''
		},
		house: {
			type: String,
			default: ''
		},
		street: {
			type: String,
			default: ''
		},
		landmark: {
			type: String,
			default: ''
		},
		city: {
			type: String,
			default: ''
		},
		country: {
			type: String,
			default: ''
		},
		zip: {
			type: String,
			default: ''
		}
	}
};