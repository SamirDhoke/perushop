// const jwt = require('jsonwebtoken');
const NormalUser = require('../models/normalUser');
const AdminUser = require('../models/adminUser');
const config = require('../config');
const { verifyJwtToken } = require('../utils');

const validateAuth = (req, res, next) => {
	const auth = req.headers['authorization'];
	if (!auth) {
		return next({ status: 401, message: "unauthorized" })
	}
	if (!auth.startsWith('Bearer')) {
		return next({ status: 400, message: "Auth token invalid." });
	}
	const token = auth.split(' ')[1];
	if (!token) {
		return next({ status: 400, message: "Auth token invalid." });
	}
	
	try {
		
		const { username, id: userId } = verifyJwtToken(token);

		if (!userId) {
			throw new {
				status: 400,
				message: 'invalid token'
			}
		}
		
		req.token = userId;
		
		next();

	} catch(e) {
		next({ 
			status: e.status || 500, 
			message: e.message 
		});
	}
	
	// req.token = token;
	// next();
}

const validateAdmin = (req, res, next) => {
	const token = req.token;
	AdminUser
		// .findOne({ email: token })
		.findOne({id: token})
		.then(user => {
			if (!user) {
				next({
					status: 400,
					message: "token not valid"
				});
			}
			req.user = user;
			next();
		})
		.catch(e => next({ status: e.status || 500, message: e.message }));
}

const validateUser = (req, res, next) => {
	const token = req.token;
	NormalUser
		// .findOne({ email: token })
		.findOne({id: token})
		.then(user => {
			if (!user) {
				next({
					status: 400,
					message: "token not valid"
				});
			}
			req.user = user;
			next();
		})
		.catch(e => next({ status: e.status || 500, message: e.message }));
}

module.exports = {
	validateAuth,
	validateUser,
	validateAdmin
};