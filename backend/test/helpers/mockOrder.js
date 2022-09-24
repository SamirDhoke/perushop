const user = require('./mockUser');


const order = {
	products: [],
	shipment: {
		address: user.address
	},
	billing: {
		address: user.address
	},
	payment: {
		paymentType: 'OFFLINE'
	}
};

module.exports = order;